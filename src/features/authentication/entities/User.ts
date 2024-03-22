import { InvalidSchemaError } from '../../common/errors/InvalidSchemaError'
import { UserSchema } from './User.schema'
import { v4 as uuidv4 } from 'uuid'

export interface TokenClaims {
   id: any,
   email: any
}

export default class User {
  constructor (public readonly id: any, public username: string, public email: string, public password: string) {
  }

  public generateTokenClaims() : TokenClaims {
    return { id: this.id, email: this.id }
  }  
  private static generateId (): string {
    return uuidv4()
  } 

  private static validate ({ id, username, email, password }: any): void {
    const parsedSchema = UserSchema.safeParse({ id, username, email, password })
    if (!parsedSchema.success) {
      throw new InvalidSchemaError(parsedSchema.error.errors)
    }
  }

  public static create (username: string, email: string, password: string, id: any = ''): User {
    this.validate({ id, username, email, password })
    if (id === '') {
      id = this.generateId()
    }
    return new User(id, username, email, password)
  }
}
