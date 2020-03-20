export abstract class MyClass {
  constructor(private readonly henk: string, public readonly bier: number) {
  }

  public what() {
    return this.henk;
  }

  public dinges() {
    const variable = 'variable';
    const banaan = 'banaan';

    return { variable, banaan: banaan };
  }
}