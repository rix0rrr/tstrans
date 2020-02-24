export abstract class MyClass {
  constructor(private readonly henk: string, public readonly bier: number) {
  }

  public what() {
    return this.henk;
  }
}