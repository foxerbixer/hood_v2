import {Strategy as JwtStrategy} from 'passport-jwt'
import { ExtractJwt } from 'passport-jwt'

module.exports = (passport, ctx) => {
  const opts = {}
  const { User } = ctx.models

  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = ctx.config.secretOrKey

  passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id)
      if (user) done(null, user)
      else done(null, false)
    } catch(error) {}
  }))
}
