import { DocumentMainData, DocumentPageData } from '~/types'

export interface IDocumentService {
  getDocument(documentKey: string): Promise<DocumentMainData>
  getPage(pageKey: string): Promise<DocumentPageData>
}
