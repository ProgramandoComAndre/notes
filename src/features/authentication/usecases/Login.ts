import { InvalidCredentialsError } from '../../common/errors/InvalidCredentialsError'
import User, { TokenClaims } from '../entities/User'
import { type UserRepository } from '../interfaces/repositories/UserRepository'
import { type PasswordHelper } from '../interfaces/security/PasswordHelper'
import { ITokenStrategy, TokenStrategy } from '../interfaces/strategy/TokenStrategy'

export class Login {
  constructor (private readonly userRepository: UserRepository, private readonly passwordHelper: PasswordHelper, private readonly tokenStrategy: ITokenStrategy) {}

  public async execute (email: string, password: string): Promise<any> {
    try {
      const user = await this.userRepository.findByEmail(email)
      if (user == null) {
        throw new InvalidCredentialsError()
      }

      const isPasswordValid = await this.isPasswordValid(password, user.password)
      if (!isPasswordValid) {
        throw new InvalidCredentialsError()
      }
      const claims = user?.generateTokenClaims()

      const token = this.tokenStrategy.buildToken(claims)
      return token

    } catch (error) {
      throw error
    }
  }

  private async isPasswordValid (password: string, hash: string): Promise<boolean> {
    const valid = await this.passwordHelper.compare(password, hash)
    return valid
  }
}
