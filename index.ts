import { makeApp } from "./src/server/express/app";
import { Container} from "./src/server/dependencies/Container"
import { MockPasswordHelper } from "./src/features/authentication/infra/test/MockPasswordHelper";
import { SequelizeUserRepository } from "./src/features/authentication/infra/prod/SequelizeUserRepository";
import { MongooseUserRepository } from "./src/features/authentication/infra/prod/MongooseUserRepository";
import { config } from "dotenv";

config()
const container = Container.getInstance()

container.register('UserRepository', new MongooseUserRepository(process.env.DATABASE_URI as string))
container.register('PasswordHelper', new MockPasswordHelper())

const app = makeApp(container)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})