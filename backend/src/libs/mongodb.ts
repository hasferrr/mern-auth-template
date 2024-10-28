import mongoose from 'mongoose'

export const connectdb = async () => {
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
