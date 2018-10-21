import { AsyncRouter } from 'express-async-router'
import passport from 'passport'
import _ from 'lodash'
import validateProfileInput from '../helpers/profile'
import validateExperienceInput from '../helpers/experience'
import validateEducationInput from '../helpers/education'


export default ctx => {
  
  const api = AsyncRouter()
  const { Profile, User } = ctx.models

  //*** @api    GET api/profile
  //*** @desc   Get current user profile
  //*** @access Private
  api.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {

      const errors = {}
      const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']) 
      if (!profile) {
        errors.noprofile = `There's no profile for this user`
        res.status(404).json(errors)
      } else {
        res.json(profile)
      }

    } catch(error) {
      res.status(404).json({ error: error})
    }
  })

  //*** @api    GET api/profile/all
  //*** @desc   Get all profiles
  //*** @access Public
  api.get('/all', async (req, res) => {
    try {
      
      const errors = {}
      const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        if (!profiles) {
          errors.noprofiles = `There're no profiles`
          res.status(404).json(errors)
        } else {
          res.json(profiles)
        }
    } catch(error){
      res.status(404).json({ error: error })
    }
  })

  //*** @api    GET api/profile/handle/:handle
  //*** @desc   Get profile by handle
  //*** @access Public
  api.get('/handle/:handle', async (req, res) => {
    try {
      
      const errors = {}
      const profile = await Profile.findOne({ handle: req.params.handle }).populate('user', ['name', 'avatar'])
        if (!profile) {
          errors.handle = `There's no profile for this user`
          res.status(404).json(errors)
        } else {
          res.json(profile)
        }
    } catch(error){
      res.status(404).json({ error: error })
    }
  })

  //*** @api    GET api/profile/user/:user_id
  //*** @desc   Get profile by user ID
  //*** @access Public
  api.get('/user/:user_id', async (req, res) => {
    try {
      ctx.log.info(req.params)

      const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar'])
      if (!profile) {
        errors.handle = `There's no profile for this user`
        res.status(404).json(errors)
      } else {
        res.json(profile)
      }

    } catch(error) {
      res.status(404).json({ error: error })
    }
  })

  //*** @api    POST api/profile
  //*** @desc   Create or edit user profile
  //*** @access Private
  api.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {

      const { isValid, errors } = validateProfileInput(req.body)
      if (!isValid) return res.status(400).json(errors)
      const profilefields = {}
      profilefields.user = req.user.id
      if (req.body.handle) profilefields.handle = req.body.handle
      if (req.body.company) profilefields.company = req.body.company
      if (req.body.website) profilefields.website = req.body.website
      if (req.body.location) profilefields.location = req.body.location
      if (req.body.bio) profilefields.bio = req.body.bio
      if (req.body.status) profilefields.status = req.body.status
      if (req.body.steam) profilefields.steam = req.body.steam

      if (typeof req.body.skills !== undefined) profilefields.skills = req.body.skills.split(',')

      profilefields.social = {}
      if (req.body.youtube) profilefields.social.youtube = req.body.youtube
      if (req.body.facebook) profilefields.social.facebook = req.body.facebook
      if (req.body.instagram) profilefields.social.instagram = req.body.instagram
      if (req.body.twitter) profilefields.social.twitter = req.body.twitter
      if (req.body.steam) profilefields.social.steam = req.body.steam
      if (req.body.linkedin) profilefields.social.linkedin = req.body.linkedin

      const profile = await Profile.findOne({ user: req.user.id})
      if (profile) {

        const updatedProfile = await Profile.findOneAndUpdate( 
          { user: req.user.id }, { $set: profilefields}, { new: true} 
          )  
        res.json(updatedProfile)

      } else {
        const profile = await Profile.findOne({ handle: profilefields.handle })
        if (profile) {
          errors.handle = 'This profile is already exists'
          res.json(errors)
        } else {
          const newProfile = await new Profile(profilefields).save()
          res.json(newProfile)
        }

      }

    } catch(error) {
      res.status(404).json({ error: error })
    }
  })

  //*** @api    POST api/profile/experience
  //*** @desc   Add experience to profile
  //*** @access Private
  api.post('/experience', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {

      const { isValid, errors } = validateExperienceInput(req.body)
      if (!isValid) return res.status(404).json(errors)
  
      const profile = await Profile.findOne({ user: req.user.id })
      if (profile) {
        const newExp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        }
        profile.experience.unshift(newExp)

        const updatedProf = await profile.save()
        res.json(updatedProf)
      }
    } catch(error) {
      res.status(404).json({ error: error })
    }
  })

  //*** @api    POST api/profile/education
  //*** @desc   Add education to profile
  //*** @access Private
  api.post('/education', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const { isValid, errors } = validateEducationInput(req.body)
      if (!isValid) return res.status(404).json(errors)
      const profile = await Profile.findOne({ user: req.user.id })
      if (profile) {
        const newEdu = {
          school: req.body.school,
          degree: req.body.degree,
          fieldofstudy: req.body.fieldofstudy,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        }
        profile.education.unshift(newEdu)

        const updatedProf = await profile.save()
        res.json(updatedProf)
      }
    } catch(error) {
      res.status(404).json({ error: error })
    }
  })

  //*** @api    DELETE api/profile/experience/:exp_id
  //*** @desc   Delete experience from profile
  //*** @access Private
  api.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id })
      if (profile) {
        profile.experience = _.remove(profile.experience, (item) => {
          return item.id !== req.params.exp_id
        })
        const updatedProf = await profile.save()
        res.json(updatedProf)
      }
    } catch(error) {
      res.status(404).json({ error: error })
    }
  })

  //*** @api    DELETE api/profile/education/:edu_id
  //*** @desc   Delete education from profile
  //*** @access Private
  api.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id })
      if (profile) {
        profile.education = _.remove(profile.education, (item) => {
          return item.id !== req.params.edu_id
        })
        const updatedProf = await profile.save()
        res.json(updatedProf)
      }
    } catch(error) {
      res.status(404).json({ error: error })
    }
  })

  //*** @api    DELETE api/profile
  //*** @desc   Delete user and profile
  //*** @access Private
  api.delete('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {

      const resp = await Profile.findOneAndRemove({ user: req.user.id })
      if (resp) {
        await User.findOneAndRemove({ _id: req.user.id })
        res.json('success')
      }

    } catch(error) {
      res.status(404).json({ error: error })
    }
  })

  return api
}
