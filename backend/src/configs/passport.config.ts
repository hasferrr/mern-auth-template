import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { User } from '../models/user'

export const passportStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: `http://localhost:${process.env.PORT!}/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value
          if (!email) {
            return done(new Error('No email found for this user'), false)
          }

          // Check if user already exists in the database
          let user = await User.findOne({ email })
          if (!user) {
            user = new User({
              username: profile.displayName,
              email: email,
              passwordHash: '',
            })
            await user.save()
          }

          return done(null, user)
        } catch (err) {
          return done(err, false)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user!)
  })

  passport.deserializeUser((user, done) => {
    done(null, user!)
  })
}
