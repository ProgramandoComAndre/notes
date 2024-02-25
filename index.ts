import { makeApp } from "./src/server/express/app";
import { Container} from "./src/server/dependencies/Container"
import { MockPasswordHelper } from "./src/features/authentication/infra/test/MockPasswordHelper";
import { SequelizeUserRepository } from "./src/features/authentication/infra/prod/SequelizeUserRepository";

const container = Container.getInstance()

container.register('UserRepository', new SequelizeUserRepository())
container.register('PasswordHelper', new MockPasswordHelper())

const app = makeApp(container)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})