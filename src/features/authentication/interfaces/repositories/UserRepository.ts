import type User from '../../entities/User'

export interface UserRepository {
  create: (user: User) => Promise<User>
  findByEmail: (email: string) => Promise<User | undefined>
  findById: (id: string) => Promise<User | undefined>
  update: (user: User) => Promise<User>
  delete: (id: string) => Promise<void>
  list: () => Promise<User[]>
}
