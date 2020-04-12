export class DocumentListRecord {
  pageName: string
  documentKey: string
  constructor(pageName: string, documentKey: string) {
    this.pageName = pageName
    this.documentKey = documentKey
  }
}
