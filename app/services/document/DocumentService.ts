import { documentServiceFactory } from '~/services/document/DocumentServiceFactory'
import { IDocumentService } from '~/services/document/IDocumentService'
import { DocumentMain } from '~/models/document/DocumentMain'
import { DocumentPage } from '~/models/document/DocumentPage'
import { DocumentMainData, DocumentNodeData, DocumentPageData } from '~/types'

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
}

const getDocumentService = (documentKey: string): IDocumentService => {
  return documentServiceFactory.getDocumentService(documentKey)
}

export const documentService = new DocumentService()
