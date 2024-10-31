import mongoose from 'mongoose'
import { MONGODB_URI } from '../configs/env.config'

export const connectdb = async () => {
  mongoose.set('strictQuery', false)
  try {
    console.log('connecting to database...')
    await mongoose.connect(MONGODB_URI)
    console.log('connected to MongoDB')
  } catch (error) {
    if (error instanceof Error) {
      console.log('error connecting to MongoDB:', error.message)
    }
  }
}
