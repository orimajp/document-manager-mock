import { DocumentPage } from '~/models/document/DocumentPage'
import { DocumentMain } from '~/models/document/DocumentMain'
import { DocumentMainData, DocumentNodeData, DocumentPageData } from '~/types'
import { DocumentListRecord } from '~/models/document/DocumentListRecord'
import { NewDocumentData } from '~/models/document/NewDocumentData'
import { NewPageData } from '~/models/document/NewPageData'

export interface IDocumentService {
  getDocument(documentKey: string): Promise<DocumentMain>
  getPage(pageKey: string): Promise<DocumentPage>
  getRowDocument(documentKey: string): Promise<DocumentMainData>
  getRowPage(pageKey: string): Promise<DocumentPageData>
  updateRowDocumentNodes(
    documentKey: string,
    nodes: Array<DocumentNodeData>
  ): Promise<void>
  updateRowDocumentPage(pageData: DocumentPageData): void
  updateDocumentPage(pageData: DocumentPage): void
  registerDocumentPage(pageData: DocumentPage): DocumentPage
  getDocumentList(): Array<DocumentListRecord>
  registerDocument(
    documentKey: string,
    newDocumentData: NewDocumentData
  ): Promise<void>
  registerPage(pageKey: string, newPageData: NewPageData): Promise<void>
  registerPageAppendChild(
    targetPagekey: string,
    newPageKey: string,
    newPageData: NewPageData
  ): Promise<void>
  registerPageAppendNext(
    targetPagekey: string,
    newPageKey: string,
    newPageData: NewPageData
  ): Promise<void>
}
