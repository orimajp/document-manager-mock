import { IDocumentService } from '~/services/document/IDocumentService'
import { objectDocumentService } from '~/services/document/impl/ObjectDocumentService'
import { fileDocumentService } from '~/services/document/impl/FileDocumentService'

class DocumentServiceFactory {
  getDocumentService(key: string): IDocumentService {
    if (this.isFileDocument(key)) {
      return fileDocumentService
    }
    return objectDocumentService
  }

  private isFileDocument(key: string): boolean {
    return key.startsWith('md')
  }
}

export const documentServiceFactory = new DocumentServiceFactory()
