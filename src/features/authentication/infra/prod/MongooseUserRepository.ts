import User from '../../entities/User'
import { type UserRepository } from '../../interfaces/repositories/UserRepository'
import UserModel from '../../../../orm/mongodb/models/UserModel'
import mongoose from 'mongoose'
export class MongooseUserRepository implements UserRepository {
  constructor (baseURI: string) {
    mongoose.connection.close().then(() => {
      console.log('Mongoose closed')
      mongoose.connect(baseURI).then(() => {
        console.log('Mongoose connected')
      })
    }).catch(() => {
      mongoose.connect(baseURI).then(() => {
        console.log('Mongoose connected')
      })
    })
  }

  async create (user: User): Promise<User> {
    const userCreated = await UserModel.create({
      _id: user.id,
      username: user.username,
      email: user.email,
      password: user.password
    })

    return new User(userCreated._id, userCreated.username, userCreated.email, userCreated.password)
  }

  async findByEmail (email: string): Promise<User | undefined> {
    const user = await UserModel.findOne({ email })
    if (!user) return undefined
    return new User(user?._id, user?.username, user?.email, user?.password)
  }

  async findById (id: string): Promise<User | undefined> {
    const user = await UserModel.findById(id)

    return user?.toObject() as User | undefined
  }

  async update (user: User): Promise<User> {
    const updatedUser = await UserModel.findByIdAndUpdate(user.id, {
      username: user.username,
      email: user.email,
      password: user.password
    }, { new: true })

    if (!updatedUser) {
      throw new Error('User not found')
    }

    return updatedUser.toObject() as User
  }

  async delete (id: string): Promise<void> {
    const userDeleted = await UserModel.findByIdAndDelete(id)

    if (!userDeleted) {
      throw new Error('User not found')
    }
  }

  async list (): Promise<User[]> {
    const users = await UserModel.find()

    return users.map(user => user.toObject() as User)
  }
}
