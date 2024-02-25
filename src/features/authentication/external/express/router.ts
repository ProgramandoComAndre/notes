import { Router } from 'express'
import { type ProdRegisterPresenter } from '../../infra/prod/ProdRegisterPresenter'

export class UserRouter {
  constructor (private readonly presenter: ProdRegisterPresenter) {}

  register (): any {
    const router = Router()

    router.post('/register', async (req, res) => {
      const { username, email, password }: { username: string, email: string, password: string } = req.body
      const result = await this.presenter.handleRegister(username, email, password)
      res.status(result.success ? 200 : 400).json(result)
    })

    return router
  }
}
