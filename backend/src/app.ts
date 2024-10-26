import express from 'express'
import cors from 'cors'
import auth from './controllers/auth'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('ok')
})

app.use('/api/auth', auth)

export default app
