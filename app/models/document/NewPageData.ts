export class NewPageData {
  documentKey: String
  title: String
  pageData: String
  constructor(title: String, pageData: String, documentKey: String) {
    this.title = title
    this.pageData = pageData
    this.documentKey = documentKey
  }
}
