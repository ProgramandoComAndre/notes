import { InvalidCredentialsError } from '../../common/errors/InvalidCredentialsError'
import User from '../entities/User'
import { type UserRepository } from '../interfaces/repositories/UserRepository'
import { type PasswordHelper } from '../interfaces/security/PasswordHelper'
import { type AuthenticatedUser } from '../value-objects/AuthenticatedUser'
export class Login {
  constructor (private readonly userRepository: UserRepository, private readonly passwordHelper: PasswordHelper) {}

  public async execute (email: string, password: string): Promise<AuthenticatedUser> {
    try {
      const user = await this.userRepository.findByEmail(email)
      if (user == null) {
        throw new InvalidCredentialsError()
      }

      const isPasswordValid = await this.isPasswordValid(password, user.password)
      if (!isPasswordValid) {
        throw new InvalidCredentialsError()
      }
      return { id: user.id, email: user.email }
    } catch (error) {
      throw error
    }
  }

  private async isPasswordValid (password: string, hash: string): Promise<boolean> {
    const valid = await this.passwordHelper.compare(password, hash)
    return valid
  }
}
