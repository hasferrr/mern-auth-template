import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import passport from 'passport'
// import session from 'express-session'

import authRouter from './controllers/authRouter'
import userRouter from './controllers/userRouter'
import googleAuthRouter from './auth/googleAuth'

const app = express()

app.use(cors())
app.use(express.json())

// app.use(session({
//   secret: process.env.SECRET!,
//   resave: false,
//   saveUninitialized: true,
// }))

app.use(passport.initialize())
// app.use(passport.session())

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.get('/', (req, res) => {
  res.send('ok')
})

app.use('/', googleAuthRouter)
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

export default app
