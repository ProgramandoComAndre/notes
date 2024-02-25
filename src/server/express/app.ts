import express from 'express'
import { UserRouter } from '../../features/authentication/external/express/router'
import { ProdRegisterPresenter } from '../../features/authentication/infra/prod/ProdRegisterPresenter'
import { RegisterUser } from '../../features/authentication/usecases/RegisterUser'
import { type Container } from '../dependencies/Container'

export const makeApp: any = (container: Container) => {
  const app = express()

  app.use(express.json())

  const userRouter = new UserRouter(new ProdRegisterPresenter(new RegisterUser(container.resolve('UserRepository'), container.resolve('PasswordHelper'))))

  app.use('/users', userRouter.register())

  return app
}
