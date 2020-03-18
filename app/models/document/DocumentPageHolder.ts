import { DocumentPage } from '~/models/document/DocumentPage'

export class DocumentPageHolder {
  private pageMap: Map<string, DocumentPage>
  constructor() {
    this.pageMap = new Map<string, DocumentPage>()
  }

  getPage(pageKey: string): DocumentPage | null {
    const page = this.pageMap.get(pageKey)
    return page || null // narrowing
  }

  addPage(pageKey: string, page: DocumentPage): void {
    this.pageMap.set(pageKey, page)
  }

  clearPageCache(): void {
    this.pageMap.clear()
  }
}
