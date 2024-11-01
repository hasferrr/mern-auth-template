import routes from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../models/user'
import { SECRET } from '../configs/env.config'

const authRouter = routes.Router()

authRouter.post('/login', async (req, res) => {
  const { username, email, password } = req.body
  if (!username && !email) {
    res.status(400).json({ message: 'invalid request body' })
    return
  }

  const user = username
    ? await User.findOne({ username })
    : await User.findOne({ email })

  const passMatch = (user && user.passwordHash) ? await bcrypt.compare(password, user.passwordHash) : false
  if (!user || !passMatch) {
    res.status(400).json({ message: 'invalid credentials' })
    return
  }

  const userForToken = { id: user._id, username: user.username }
  const token = jwt.sign(userForToken, SECRET, { expiresIn: 60 * 60 })

  res.cookie('jwt', token, { maxAge: 1000 * 60 * 60 })
  res.status(200).json({ message: 'login success' })
})

authRouter.post('/register', async (req, res) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    res.status(400).json({ message: 'invalid request body' })
    return
  }
  if (username.length < 3 || username.length > 20 || password.length < 8) {
    res.status(400).json({ message: 'username or password too short/long' })
    return
  }

  const existingUser = await User.findOne({ $or: [{ username }, { email }] })
  if (existingUser) {
    res.status(400).json({ message: 'username or email already in use' })
    return
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({ username, email, passwordHash })
  const userForToken = { id: user._id, username: user.username }
  const token = jwt.sign(userForToken, SECRET, { expiresIn: 60 * 60 })

  await user.save()

  res.cookie('jwt', token, { maxAge: 1000 * 60 * 60 })
  res.status(201).json({ message: 'register success' })
})

export default authRouter
