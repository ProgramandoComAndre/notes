export class InvalidSchemaError extends Error {
  constructor (errors: any) {
    super(JSON.stringify(errors))
    this.name = 'InvalidSchemaError'
  }
}
