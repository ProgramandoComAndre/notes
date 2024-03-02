import User from '../entities/User'
import { MockPasswordHelper } from '../infra/test/MockPasswordHelper'
import { MockUserRepository } from '../infra/test/MockUserRepository'
import { Login } from './Login'

describe('Login use case', () => {
  it('should return an authenticated user', async () => {
    const userRepository = new MockUserRepository()
    await userRepository.create(User.create('John Doe', 'test@test.com', '12345678'))
    const passwordHelper = new MockPasswordHelper()
    const login = new Login(userRepository, passwordHelper)
    const user = await login.execute('test@test.com', '12345678')
    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('email', 'test@test.com')
  })

  it('should throw an error if user is not found', async () => {
    const userRepository = new MockUserRepository()
    await userRepository.create(User.create('John Doe', 'test@test.com', '12345678'))
    const passwordHelper = new MockPasswordHelper()
    const login = new Login(userRepository, passwordHelper)
    await expect(login.execute('test@test1.com', '12345678')).rejects.toThrow('Invalid credentials')
  })

  it('should throw an error if some error occured for example, database access error', async () => {
    const userRepository = new MockUserRepository()
    userRepository.findByEmail = jest.fn().mockRejectedValue(new Error('Could not connect to database'))
    const passwordHelper = new MockPasswordHelper()
    const login = new Login(userRepository, passwordHelper)
    await expect(login.execute('test@test.com', '12345678')).rejects.toThrow('Could not connect to database')
  })
})
