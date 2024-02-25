import { UserAlreadyExists } from '../../common/errors/UserAlreadyExistError'
import User from '../entities/User'
import { type UserRepository } from '../interfaces/repositories/UserRepository'
import { PasswordHelper } from '../interfaces/security/PasswordHelper'

export class RegisterUser {
  constructor (private readonly userRepository: UserRepository, private readonly passwordHelper: PasswordHelper) {}

  public async execute (username: string, email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email)
    if (user != null) {
      throw new UserAlreadyExists()
    }
    

    const newUser = User.create(username, email, password)

    return await this.userRepository.create(newUser)
  }
}
