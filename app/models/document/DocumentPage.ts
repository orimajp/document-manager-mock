import { DocumentPageData } from '~/types'

export class DocumentPage {
  documentKey: string
  pageKey: string
  pageTitle: string
  pageData: string
  constructor(pageData: DocumentPageData) {
    this.documentKey = pageData.documentKey
    this.pageKey = pageData.pageKey
    this.pageTitle = pageData.pageTitle
    this.pageData = pageData.pageData
  }
}
