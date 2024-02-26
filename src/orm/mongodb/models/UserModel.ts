import mongoose, { type Document, Schema } from 'mongoose'

export interface UserInterface extends Document {
  username: string
  email: string
  password: string
}

const UserSchema: Schema = new Schema({
  _id: { type: mongoose.Schema.Types.UUID, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
})

export default mongoose.model<UserInterface>('User', UserSchema)
