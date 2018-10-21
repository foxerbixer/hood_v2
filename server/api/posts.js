import { AsyncRouter } from 'express-async-router'
import passport from 'passport'
import _ from 'lodash'
import validatePostInput from '../helpers/post'


export default ctx => {

  const api = AsyncRouter()
  const { Post, Profile } = ctx.models


  //*** @api    POST api/posts
  //*** @desc   Create post
  //*** @access Private
  api.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
 
      const { isValid, errors } = validatePostInput(req.body)
      if (!isValid) return res.status(400).json(errors)

      const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      })

      const post = await newPost.save()
      res.json(post)

    } catch(error) {
      res.status(404).json({error: error})
    }
  })

  //*** @api    GET api/posts
  //*** @desc   Get posts
  //*** @access Public
  api.get('/', async (req, res) => {
    try {

      const posts = await Post.find().sort({ date: -1 })
      res.json(posts)

    } catch(error) {
      res.status(404).json({error: error})
    }
  })

  //*** @api    GET api/posts/:id
  //*** @desc   Get post by id
  //*** @access Public
  api.get('/:_id', async (req, res) => {
    try {

      const post = await Post.findById({ _id: req.params._id})
      if (post) {
        res.json(post)
      }

    } catch(error) {
      res.status(404).json({error: error})
    }
  })

  //*** @api    DELETE api/posts/:id
  //*** @desc   Delete post 
  //*** @access Private
  api.delete('/:_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
 
      const profile = await Profile.findOne({ user: req.user.id })
      if (profile) {
        const post = await Post.findById({ _id: req.params._id})
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json('Not authorized') 
        } else {
          await post.remove()
          res.json('success')
        }
      }

    } catch(error) {
      res.status(404).json({error: error})
    }
  })

  //*** @api    POST api/posts/like/:id
  //*** @desc   Like post
  //*** @access Private
  api.post('/like/:_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
 
      const profile = await Profile.findOne({ user: req.user.id })
      if (profile) {
        const post = await Post.findById({ _id: req.params._id})
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0 ) {
          return res.status(400).json('You already liked it')
        } else {
          post.likes.unshift({ user: req.user.id})
          const updatedPost = await post.save()
          res.json(updatedPost)
        }
      }

    } catch(error) {
      res.status(404).json({error: error})
    }
  })

  //*** @api    POST api/posts/unlike/:id
  //*** @desc   Unlike post
  //*** @access Private
  api.post('/unlike/:_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
 
      const profile = await Profile.findOne({ user: req.user.id })
      if (profile) {
        const post = await Post.findById({ _id: req.params._id})
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0 ) {
          return res.status(404).json( `You've not liked it yet`)
        } else {
          post.likes = _.remove(post.likes, (item) => {
            return item.user.toString() !== req.user.id
          })
          const updatedPost = await post.save()
          res.json(updatedPost)
        }
      }

    } catch(error) {
      res.status(404).json({error: error})
    }
  })

  //*** @api    POST api/posts/comment/:_id
  //*** @desc   Add comment
  //*** @access Private
  api.post('/comment/:_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      
      const { isValid, errors } = validatePostInput(req.body)
      if (!isValid) return res.status(400).json(errors)
      const post = await Post.findById({ _id: req.params._id})

      if (post) {
        const newComment = {
          user: req.user.id,
          name: req.body.name,
          avatar: req.body.avatar,
          text: req.body.text
        }

        post.comments.unshift(newComment)
        const updatedPost = await post.save()
        res.json(updatedPost)
      }
      
    } catch(error) {
      res.status(404).json({error: error})
    }
  })

  //*** @api    DELETE api/posts/comment/:_id/:comment_id
  //*** @desc   Delete comment
  //*** @access Private
  api.delete('/comment/:_id/:comment_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {

      const post = await Post.findById({ _id: req.params._id})
      if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
        return res.status(404).json(`There's not comment`)
      } else {
        post.comments = _.remove(post.comments, (item) => {
          return item._id.toString() !== req.params.comment_id
        })
      }

      const updatedPost = await post.save()
      res.json(updatedPost)

    } catch(error) {
      res.status(404).json({error: error})
    }
  })

  return api
}
