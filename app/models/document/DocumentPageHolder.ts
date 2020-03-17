import { DocumentPageWrapper } from '~/models/document/DocumentPageWrapper'

export class DocumentPageHolder {
  private pageMap: Map<string, DocumentPageWrapper>
  constructor() {
    this.pageMap = new Map<string, DocumentPageWrapper>()
  }

  getPage(pageKey: string): DocumentPageWrapper | null {
    const page = this.pageMap.get(pageKey)
    return page || null // narrowing
  }

  addPage(pageKey: string, page: DocumentPageWrapper): void {
    this.pageMap.set(pageKey, page)
  }

  clearPageCache(): void {
    this.pageMap.clear()
  }
}
