import { JWTAdapter } from './JWTAdapter'
import jwtLib from 'jsonwebtoken'
describe('JWTAdapter', () => {
  it('should generate and verify tokens', () => {
    const jwt = new JWTAdapter('secret')
    const token = jwt.generateToken({ id: 'mock-id', email: 'mock@mock.com' })
    const payload = jwt.verifyToken(token)
    expect(payload.id).toBe('mock-id')
    expect(payload.email).toBe('mock@mock.com')
  })

  it('should throw error if for example JWT fails', () => {
    jest.spyOn(jwtLib,'sign').mockImplementationOnce(() => { throw new Error('JWT Generation error') })
    const jwt = new JWTAdapter('secret')
    console.log('test')
    expect(() => jwt.generateToken({ id: 'mock-id', email: 'mock@mock.com' })).toThrow('JWT Generation error')

    jest.clearAllMocks()
  })

  it('it should throw error if verification of JWT fails', () => {
    jest.spyOn(jwtLib, 'verify').mockImplementationOnce(() => { throw new Error('JWT Verification error') })
    const jwt = new JWTAdapter('secret')
    expect(() => jwt.verifyToken('mock-token')).toThrow('JWT Verification error')
  })
})
