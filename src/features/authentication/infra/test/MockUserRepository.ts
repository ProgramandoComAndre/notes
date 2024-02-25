import type User from '../../entities/User'
import { type UserRepository } from '../../interfaces/repositories/UserRepository'

export class MockUserRepository implements UserRepository {
  private users: User[] = []

  public async create (user: User): Promise<User> {
    this.users.push(user)
    return user
  }

  public async findByEmail (email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email)
  }

  public async findById (id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id)
  }

  public async update (user: User): Promise<User> {
    const index = this.users.findIndex(u => u.id === user.id)
    this.users[index] = user
    return user
  }

  public async delete (id: string): Promise<void> {
    this.users = this.users.filter(user => user.id !== id)
  }

  public async list (): Promise<User[]> {
    return this.users
  }
}
