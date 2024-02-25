import zod from 'zod'

const envSchema = zod.object({
  DATABASE_URI: zod.string(),
  DB_USERNAME: zod.string(),
  DB_PASSWORD: zod.string(),
  DB_NAME: zod.string(),
  DB_HOST: zod.string(),
  NODE_ENV: zod.enum(['development', 'production', 'test']),
})

export const validateEnv = (env: any): void => {
  envSchema.parse(env)
}
