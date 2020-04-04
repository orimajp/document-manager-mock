import { DocumentPage } from '~/models/document/DocumentPage'
import { DocumentMain } from '~/models/document/DocumentMain'

export interface IDocumentService {
  getDocument(documentKey: string): Promise<DocumentMain>
  getPage(pageKey: string): Promise<DocumentPage>
}
