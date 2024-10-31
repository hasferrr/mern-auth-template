import express from 'express'
import cors from 'cors'
import passport from 'passport'
import cookieParser from 'cookie-parser'

import authRouter from './controllers/authRouter'
import userRouter from './controllers/userRouter'
import googleAuthRouter from './controllers/googleAuthRouter'
import { passportStrategy } from './configs/passport.config'
import { connectdb } from './libs/mongodb'
import { FRONTEND_URL } from './configs/env.config'

const app = express()

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())

await connectdb()
passportStrategy()

app.get('/', (req, res) => { res.send('ok') })
app.use('/auth', googleAuthRouter)
app.use('/auth', authRouter)
app.use('/user', userRouter)

export default app
