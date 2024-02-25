export class Container {
  private static instance: Container | null = null
  private readonly dependencies: Map<string, any>

  constructor () {
    this.dependencies = new Map()
  }

  public static getInstance (): Container {
    if (Container.instance == null) {
      Container.instance = new Container()
    }

    return Container.instance
  }

  public register (key: string, value: any): void {
    this.dependencies.set(key, value)
  }

  public resolve<T>(key: string): T {
    return this.dependencies.get(key)
  }
}
