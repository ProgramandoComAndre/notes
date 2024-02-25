import User from '../../entities/User'
import { type UserRepository } from '../../interfaces/repositories/UserRepository'
import { User as UserModel} from '../../../../orm/sequelize/models/User'
export class SequelizeUserRepository implements UserRepository {
  async create (user: User): Promise<User> {
    const userCreated = await UserModel.create({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password
    })

    const userEntity = new User(userCreated.id, userCreated.username, userCreated.email, userCreated.password)
    return userEntity
  }

  async findByEmail (email: string): Promise<User | undefined> {
    const user = await UserModel.findOne({ where: { email } })

    if (!user) {
      return undefined
    }

    return new User(user.id, user.username, user.email, user.password)
  }

  async findById (id: string): Promise<User | undefined> {
    const user = await UserModel.findByPk(id)

    if (!user) {
      return undefined
    }

    return new User(user.id, user.username, user.email, user.password)
  }

  async update (user: User): Promise<User> {
    const userUpdated = await UserModel.update({
      username: user.username,
      email: user.email,
      password: user.password
    }, { where: { id: user.id } })

    if (!userUpdated) {
      throw new Error('User not found')
    }

    return new User(user.id, user.username, user.email, user.password)
  }

  async delete (id: string): Promise<void> {
    const userDeleted = await UserModel.destroy({ where: { id } })

    if (!userDeleted) {
      throw new Error('User not found')
    }
  }

  async list (): Promise<User[]> {
    const users = await UserModel.findAll()

    return users.map(user => new User(user.id, user.username, user.email, user.password))
  }
}
