import routes from 'express'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import jwt from 'jsonwebtoken'

import { User } from '../models/user'

// Passport Google OAuth strategy setup
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

        // Generate JWT
        const userForToken = { id: user._id, username: user.username }
        const token = jwt.sign(userForToken, process.env.SECRET!, { expiresIn: 60 * 60 })

        return done(null, { token })
      } catch (err) {
        return done(err, false)
      }
    }
  )
)

// // Serialize and deserialize user to support persistent login sessions
// passport.serializeUser((user, done) => {
//   done(null, (user as { id: string }).id)
// })

// passport.deserializeUser(async (id: string, done) => {
//   try {
//     const user = await User.findById(id)
//     done(null, user)
//   } catch (err) {
//     done(err, null)
//   }
// })

// Routes for Google OAuth authentication
const googleAuthRouter = routes.Router()

// Initiate Google OAuth login
googleAuthRouter.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
  }),
)

// Handle callback after Google has authenticated the user
googleAuthRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    session: false,
    // successRedirect: '/api/user',
    // failureRedirect: '/api/auth/login',
  }),
  (req, res) => {
    const { token } = req.user as { token: string }
    res.status(200).json({ message: 'google login success', token })
  }
)

export default googleAuthRouter
