import { DocumentPage } from '~/models/document/DocumentPage'
import { DocumentMain } from '~/models/document/DocumentMain'
import { DocumentMainData, DocumentNodeData, DocumentPageData } from '~/types'

export interface IDocumentService {
  getDocument(documentKey: string): Promise<DocumentMain>
  getPage(pageKey: string): Promise<DocumentPage>
  getRowDocument(documentKey: string): Promise<DocumentMainData>
  getRowPage(pageKey: string): Promise<DocumentPageData>
  updateRowDocumentNodes(
    documentKey: string,
    nodes: Array<DocumentNodeData>
  ): Promise<void>
}
