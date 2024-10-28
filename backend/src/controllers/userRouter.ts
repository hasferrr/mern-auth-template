import routes from 'express'
import { tokenExtractor, userExtractor } from '../middlewares/authentication'

const userRouter = routes.Router()

userRouter.get('/', tokenExtractor, userExtractor, async (req, res) => {
  res.send({ message: 'success', user: req.user })
})

export default userRouter
