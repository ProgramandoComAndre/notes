import type User from '../../entities/User'

export interface RegisterResponse {
  success: boolean
  error: Error | undefined
  user: User | undefined
}

export interface RegisterPresenter {
  handleRegister: (username: string, email: string, password: string) => Promise<RegisterResponse>
}
