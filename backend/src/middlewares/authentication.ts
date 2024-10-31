import jwt from 'jsonwebtoken'
import { User } from '../models/user'
import type { NextFunction, Request, Response } from 'express'
import { SECRET } from '../configs/env.config'

export const tokenExtractor = async (req: Request, res: Response, next: NextFunction) => {
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

  req.locals = { token }
  next()
}

export const userExtractor = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.locals!.token
  let decodedToken
  try {
    decodedToken = jwt.verify(token, SECRET)
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

  req.user = user
  next()
}
