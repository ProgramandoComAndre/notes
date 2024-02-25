import { Sequelize } from 'sequelize'
import { config } from 'dotenv'
import { validateEnv } from './utils/ValidateEnv'

import conf from './config.js'

try {
  validateEnv(process.env)
} catch (error: any) {
  const errors = error.errors.map((err: any) => err.path)
  errors.map((err: any) => { console.error(err, 'required env variable is missing. Please check your .env file.') })
  process.exit(1)
}

const sequelize = new Sequelize(conf[process.env.NODE_ENV as string])

export default sequelize
