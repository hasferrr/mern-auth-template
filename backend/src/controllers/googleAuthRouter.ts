import routes from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { SECRET, FRONTEND_URL } from '../configs/env.config'

const googleAuthRouter = routes.Router()

googleAuthRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
  }),
)

googleAuthRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    // successRedirect: '/user',
    // failureRedirect: '/auth/login',
  }),
  (req, res) => {
    const user = req.user as { id: string, username: string }
    const userForToken = { id: user.id, username: user.username }
    const token = jwt.sign(userForToken, SECRET, { expiresIn: 60 * 60 })
    res.cookie('jwt', token, { maxAge: 1000 * 60 * 60 })
    res.redirect(FRONTEND_URL)
  }
)

export default googleAuthRouter
