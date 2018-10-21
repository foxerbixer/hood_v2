import { AsyncRouter } from 'express-async-router'
import gravatar from 'gravatar'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import isImageUrl from 'is-image-url'
import validateRegisterInput from '../helpers/register'
import validateLoginInput from '../helpers/login'
import { fetchPictureToCloudinary } from '../helpers/cloudinary'


export default ctx => {

  const api = AsyncRouter()
  const { User } = ctx.models

  //*** @api    POST api/users/register
  //*** @desc   Register users route
  //*** @access Public
  api.post('/register', async (req, res) => {
    try {

      const { isValid, errors } = await validateRegisterInput(req.body)

      if (!isValid) return res.status(400).json(errors)

      if ((req.body.avatar.trim()).length > 0) {
        const isImage = await isImageUrl(req.body.avatar)
        if (!isImage) return errors.avatar = 'This image is not valid'
      }

      const user = await User.findOne({ email: req.body.email })

      if (user) {
        errors.email = 'Email already exists'
        res.status(400).json(errors) 
      } else {
        const cloud_avatar = await fetchPictureToCloudinary(req.body.avatar, ctx.config.cloudinary)
        
        let avatar = cloud_avatar || gravatar.url(req.body.email, {s: 200, r: 'pg',d: 'mm' })

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        })

       await bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash
            newUser.save()
          })
        })

        await res.json('success')
      }
    } catch(error) {
      console.log(error)
    }
  })

  //*** @api    POST api/users/login
  //*** @desc   Return jwt
  //*** @access Public
  api.post('/login', async (req, res) => {

    try {

      const { email, password } = req.body
      const { isValid, errors } = validateLoginInput(req.body)
  
      if (!isValid) return res.status(400).json(errors)
  
      const user = await User.findOne({ email })
      if (!user) {
        errors.email = 'User not found'
        res.status(404).json(errors)
      } else {
        
        const isMatch = await bcrypt.compare(password, user.password)
       
        if (isMatch) {

          const payload = {
            id : user.id, 
            name: user.name, 
            avatar: user.avatar
          }

          const token  = await jwt.sign(payload, ctx.config.secretOrKey, { expiresIn: 36000 * 24})
          await res.json({ success: true, token: `Bearer ${token}`  })

        } else {
          errors.password = 'Password incorrect'
          res.status(400).json(errors)
        }
      } 
    } catch(error) {
      console.log(error)
    }
  })
  return api
}

