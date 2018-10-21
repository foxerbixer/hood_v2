import mongoose from 'mongoose'
const Schema = mongoose.Schema

export default () => {
  const UserSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
}, {
      collection: 'user',
      timestamps: true
  })
      
  return  mongoose.model('User', UserSchema)
}