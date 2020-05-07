class PageKeyFactory {
  createPageKey(key?: String): string {
    if (!key || key.startsWith('gen')) {
      return `gen-${this.createSeed()}`
    }
    if (key.startsWith('md')) {
      return `md-${this.createSeed()}`
    }
    return `page-${this.createSeed()}`
  }

  private createSeed(): number {
    return new Date().valueOf()
  }
}

export const pageKeyFactory = new PageKeyFactory()
