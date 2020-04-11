import { documentServiceFactory } from '~/services/document/DocumentServiceFactory'
import { IDocumentService } from '~/services/document/IDocumentService'
import { DocumentMain } from '~/models/document/DocumentMain'
import { DocumentPage } from '~/models/document/DocumentPage'
import { DocumentMainData, DocumentNodeData, DocumentPageData } from '~/types'
import { pageKeyFactory } from '~/services/document/PageKeyFactory'

class DocumentService implements IDocumentService {
  getDocument(documentKey: string): Promise<DocumentMain> {
    return getDocumentService(documentKey).getDocument(documentKey)
  }

  getPage(pageKey: string): Promise<DocumentPage> {
    return getDocumentService(pageKey).getPage(pageKey)
  }

  getRowDocument(documentKey: string): Promise<DocumentMainData> {
    return getDocumentService(documentKey).getRowDocument(documentKey)
  }

  getRowPage(pageKey: string): Promise<DocumentPageData> {
    return getDocumentService(pageKey).getRowPage(pageKey)
  }

  updateRowDocumentNodes(
    documentKey: string,
    nodes: Array<DocumentNodeData>
  ): Promise<void> {
    return getDocumentService(documentKey).updateRowDocumentNodes(
      documentKey,
      nodes
    )
  }

  updateRowDocumentPage(pageData: DocumentPageData): void {
    getDocumentService(pageData.pageKey).updateRowDocumentPage(pageData)
  }

  updateDocumentPage(pageData: DocumentPage): void {
    getDocumentService(pageData.pageKey).updateDocumentPage(pageData)
  }

  registerDocumentPage(pageData: DocumentPage): DocumentPage {
    const pageKey = pageKeyFactory.createPageKey()
    pageData.pageKey = pageKey
    return getDocumentService(pageKey).registerDocumentPage(pageData)
  }
}

const getDocumentService = (documentKey: string): IDocumentService => {
  return documentServiceFactory.getDocumentService(documentKey)
}

export const documentService = new DocumentService()
