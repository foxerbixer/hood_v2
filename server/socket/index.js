import _ from 'lodash'

export default ctx => {

  let connections = []

  const { io } = ctx

  io.on('connection', async socket => { 
    ctx.log.info(`Socket connection with id ${socket.id}`)
    connections.push(socket.id)
    ctx.log.info(`Connections # ${connections}`)
  
    
    socket.on('SEND_MESSAGE', async data => {
      io.emit('RECEIVE_MESSAGE', data) 
    })

    socket.on('disconnect', async () => {
      ctx.log.info(`Socket disconnected with id ${socket.id}`)
       _.remove(connections, item => {
        return item !== socket.id
      })
      ctx.log.info(`Connections # ${connections}`)
    })
  })

}
