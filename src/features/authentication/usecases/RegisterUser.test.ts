import { MockPasswordHelper } from '../infra/test/MockPasswordHelper'
import { MockUserRepository } from '../infra/test/MockUserRepository'
import { RegisterUser } from './RegisterUser'

const makeDto = () => ({
  username: 'John Doe',
  email: 'test@test.com',
  password: '12345678'
})
describe('RegisterUser', () => {
  it('should register a new user', async () => {
    const userDto = makeDto()
    const userRepository = new MockUserRepository()
    const passwordHelper = new MockPasswordHelper()
    const registerUser = new RegisterUser(userRepository, passwordHelper)

    const user = await registerUser.execute(userDto.username, userDto.email, userDto.password)

    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('username', userDto.username)
    expect(user).toHaveProperty('email', userDto.email)
    expect(user).toHaveProperty('password', userDto.password)
  })

  it('should not register a new user with an already used email', async () => {
    const userDto = makeDto()
    const userRepository = new MockUserRepository()
    const passwordHelper = new MockPasswordHelper()
    const registerUser = new RegisterUser(userRepository, passwordHelper)

    await registerUser.execute(userDto.username, userDto.email, userDto.password)

    await expect(registerUser.execute(userDto.username, userDto.email, userDto.password)).rejects.toThrow('User already exists')
  })

  it('should not register a new user with an invalid email', async () => {
    const userDto = makeDto()
    const userRepository = new MockUserRepository()
    const passwordHelper = new MockPasswordHelper()
    const registerUser = new RegisterUser(userRepository, passwordHelper)

    await expect(registerUser.execute(userDto.username, 'invalid-email', userDto.password)).rejects.toThrow('Invalid email')
  })

  it('should not register a new user with an invalid password', async () => {
    const userDto = makeDto()
    const userRepository = new MockUserRepository()
    const passwordHelper = new MockPasswordHelper()
    const registerUser = new RegisterUser(userRepository, passwordHelper)

    await expect(registerUser.execute(userDto.username, userDto.email, '123')).rejects.toThrow(Error)
  })

  it('should not register a new user with an invalid username', async () => {
    const userDto = makeDto()
    const userRepository = new MockUserRepository()
    const passwordHelper = new MockPasswordHelper()
    const registerUser = new RegisterUser(userRepository, passwordHelper)

    expect(registerUser.execute('', userDto.email, userDto.password)).rejects.toThrow(Error)
  })

  it('should throw an error if it have a unknown error for example with a database error', async () => {
    const userDto = makeDto()
    const userRepository = new MockUserRepository()
    const passwordHelper = new MockPasswordHelper()
    const registerUser = new RegisterUser(userRepository, passwordHelper)
    userRepository.findByEmail = jest.fn().mockRejectedValue(new Error('Could not connect to database'))
    await expect(registerUser.execute(userDto.username, userDto.email, userDto.password)).rejects.toThrow('Could not connect to database')
  })
  
})
