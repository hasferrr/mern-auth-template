import routes from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/user'

const userRouter = routes.Router()

userRouter.get('/', async (req, res) => {
  // const authorization = req.get('authorization') || ''
  // if (!authorization || !authorization.startsWith('Bearer')) {
  //   res.status(401).json({ message: 'token is invalid' })
  //   return
  // }
  // const token = authorization.replace('Bearer ', '')

  const token: string | undefined = req.cookies.jwt
  if (!token) {
    res.status(401).json({ message: 'token is invalid' })
    return
  }

  let decodedToken
  try {
    decodedToken = jwt.verify(token, process.env.SECRET!)
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: 'token is invalid', error: error.name })
      return
    }
    res.status(401).json({ message: 'token is invalid' })
    return
  }

  if (typeof decodedToken === 'string' || !decodedToken.id) {
    res.status(401).json({ message: 'token is invalid' })
    return
  }

  const user = await User.findById(decodedToken.id)
  if (!user) {
    res.status(401).json({ message: 'user is not found' })
    return
  }

  res.send({ message: 'success', user })
})

export default userRouter
