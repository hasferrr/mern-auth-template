import routes from 'express'

const auth = routes.Router()

auth.post('/login', (req, res) => {
  res.json({ status: 'unimplemented' })
})

auth.post('/register', (req, res) => {
  res.json({ status: 'unimplemented' })
})

export default auth
