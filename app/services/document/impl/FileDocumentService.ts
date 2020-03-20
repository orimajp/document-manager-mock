import { IDocumentService } from '~/services/document/IDocumentService'
import { DocumentMainData, DocumentPageData } from '~/types'

class FileDocumentService implements IDocumentService {
  getDocument(documentKey: string): Promise<DocumentMainData> {
    console.log(documentKey)
    return {} as Promise<DocumentMainData>
  }

  getPage(pageKey: string): Promise<DocumentPageData> {
    console.log(pageKey)
    return {} as Promise<DocumentPageData>
  }
}

export const fileDocumentService = new FileDocumentService()
