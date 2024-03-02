import { verify, sign } from 'jsonwebtoken'
import { type TokenHelper } from '../../interfaces/security/TokenHelper'

type Token = string
export class JWTAdapter implements TokenHelper {
  private readonly secret: string
  constructor (secret: string) {
    this.secret = secret
  }

  generateToken (payload: any): Token {
    try {
    return sign(payload, this.secret)
    }
    catch(error) {
        throw error
    }
  }

  verifyToken (token: Token): any {
    return verify(token, this.secret)
  }
}
