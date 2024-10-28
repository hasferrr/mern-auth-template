import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import passport from 'passport'
// import session from 'express-session'

import authRouter from './controllers/authRouter'
import userRouter from './controllers/userRouter'
import googleAuthRouter from './controllers/googleAuthRouter'

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

const connectdb = async () => {
  mongoose.set('strictQuery', false)
  try {
    console.log('connecting to database...')
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log('connected to MongoDB')
  } catch (error) {
    if (error instanceof Error) {
      console.log('error connecting to MongoDB:', error.message)
    }
  }
}
await connectdb()

app.get('/', (req, res) => {
  res.send('ok')
})

app.use('/auth', googleAuthRouter)
app.use('/auth', authRouter)
app.use('/user', userRouter)

export default app
