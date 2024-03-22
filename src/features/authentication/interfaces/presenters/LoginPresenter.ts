import type User from '../../entities/User'

export interface LoginResponse {
  success: boolean
  error: Error | undefined
  user: User | undefined
}

export interface LoginPresenter {
  handleLogin: (email: string, password: string) => Promise<LoginResponse>
}