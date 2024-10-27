import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: String,
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const User = model('User', userSchema)
