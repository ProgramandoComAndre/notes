import { RegisterUser } from '../../usecases/RegisterUser'
import { MockPasswordHelper } from '../test/MockPasswordHelper'
import { MockUserRepository } from '../test/MockUserRepository'
import { ProdRegisterPresenter } from './ProdRegisterPresenter'

describe('ProdRegisterPresenter', () => {
  it('should call registerUseCase with correct values', async () => {
    const registerUseCase = new RegisterUser(new MockUserRepository(), new MockPasswordHelper())
    registerUseCase.execute = jest.fn()
    const sut = new ProdRegisterPresenter(registerUseCase)
    await sut.handleRegister('John Doe', 'test@test.com', '12345678')
    expect(registerUseCase.execute).toHaveBeenCalledWith('John Doe', 'test@test.com', '12345678')
  })
  it('should return success true and user on success', async () => {
    const registerUseCase = new RegisterUser(new MockUserRepository(), new MockPasswordHelper())
    const sut = new ProdRegisterPresenter(registerUseCase)
    const result = await sut.handleRegister('John Doe', 'test@test.com', '12345678')
    expect(result.success).toBe(true)
    expect(result.error).toBeUndefined()
    expect(result.user).toHaveProperty('id')
    expect(result.user).toHaveProperty('username', 'John Doe')
    expect(result.user).toHaveProperty('email', 'test@test.com')
    expect(result.user).toHaveProperty('password', '12345678')
  })

  it('should return success false and error on failure', async () => {
    const registerUseCase = new RegisterUser(new MockUserRepository(), new MockPasswordHelper())
    registerUseCase.execute = jest.fn().mockRejectedValue(new Error('User already exists'))
    const sut = new ProdRegisterPresenter(registerUseCase)
    const result = await sut.handleRegister('John Doe', 'test@test.com', '12345678')
    expect(result.success).toBe(false)
    expect(result.error).toEqual(new Error('User already exists'))
    expect(result.user).toBeUndefined()
  })
})
