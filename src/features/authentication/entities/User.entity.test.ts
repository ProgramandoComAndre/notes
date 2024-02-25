import User from './User'

describe('User Entity', () => {
  it('should create a new user', () => {
    const user = User.create('username', 'test@test.com', 'password1234')
    expect(user).toBeInstanceOf(User)
  })

  it('should throw an error if the schema is invalid', () => {
    expect(() => User.create('', '', '', '')).toThrow()
  })
})
