import express from 'express'
import mongoose from 'mongoose'
import bunyan from 'bunyan'
import passport from 'passport'
import path from 'path'
import http from 'http'
import socket from 'socket.io'
import getMiddlewares from './middlewares'
import getModels from './models'
import getApi from './api'
import getSocket from './socket'


class App {
  constructor(params = {}) {
    Object.assign(this, params)
    this.log = this.getLogger()
    this.init()
  }

  getLogger(params) {
    return bunyan.createLogger(Object.assign({
      name: 'app',
      level: 'trace'
    }, params))
  }

  getDataBase() {
    return {
      run: () => {
        new Promise(resolve => {
          mongoose.connect(this.config.db.url, { useNewUrlParser: true })
          resolve()
        })
      }
    }
  }

  getModels() {
    return getModels(this)
  }

  getMiddlewares() {
    return getMiddlewares(this)
  }

  init() {
    this.log.info('App init')
    this.app = express()
    this.httpServer = http.Server(this.app)
    this.io = socket(this.httpServer)
    this.db = this.getDataBase()
    this.middlewares = getMiddlewares()
    this.log.info('middlewares', Object.keys(this.middlewares))
    this.models = this.getModels()
    this.log.info('models', Object.keys(this.models))
    this.passport = passport
  
    this.useMiddlewares()
    this.getRoutes()
    this.middlewares.passport(passport, this)
    this.getSocket()

      this.app.use(express.static('./client/build'))
      this.app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
     })
    
  }

  useMiddlewares() {
    this.app.use(this.middlewares.reqParser),
    this.app.use(this.middlewares.compress), 
    this.app.use(this.passport.initialize())
  }


  getRoutes() {
    const api = getApi(this)
    this.app.use('/api/users', api.users)
    this.app.use('/api/profile', api.profile)
    this.app.use('/api/posts', api.post)
  }

  getSocket() {
    return getSocket(this)
  }

  async run() {
    this.log.info('App run')
    try {
      await this.db.run()
    } catch(err) {
      this.log.total(err)
    }

    return new Promise(resolve => {
      this.httpServer.listen(this.config.port, () => {
        this.log.info(`App "${this.config.name}" is working on port ${this.config.port}`)
        resolve(this)
      })
    })
  }
}

export default App



