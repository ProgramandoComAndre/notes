import validation from 'zod'

export const UserSchema = validation.object({
  id: validation.string(),
  email: validation.string().email(),
  username: validation.string().min(1),
  password: validation.string().min(8)
})
