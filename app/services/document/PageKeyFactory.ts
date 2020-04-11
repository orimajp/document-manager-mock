class PageKeyFactory {
  createPageKey(): string {
    return `gen-${this.createSeed()}`
  }

  private createSeed(): number {
    return new Date().valueOf()
  }
}

export const pageKeyFactory = new PageKeyFactory()
