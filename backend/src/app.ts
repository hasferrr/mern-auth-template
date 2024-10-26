import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import authRouter from './controllers/authRouter'

const app = express()

app.use(cors())
app.use(express.json())

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

app.use('/api/auth', authRouter)

export default app
