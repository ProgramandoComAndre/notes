import { type RegisterPresenter, type RegisterResponse } from '../../interfaces/presenters/RegisterPresenter'
import { type RegisterUser } from '../../usecases/RegisterUser'

export class ProdRegisterPresenter implements RegisterPresenter {
  constructor (private readonly registerUseCase: RegisterUser) {}

  async handleRegister (username: string, email: string, password: string): Promise<RegisterResponse> {
    try {
      const user = await this.registerUseCase.execute(username, email, password)
      return { success: true, error: undefined, user }
    } catch (error: any) {
      return {
        success: false, error, user: undefined
      }
    }
  }
}
