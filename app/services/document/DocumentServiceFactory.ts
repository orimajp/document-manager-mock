import { IDocumentService } from '~/services/document/IDocumentService'
import { objectDocumentService } from '~/services/document/impl/ObjectDocumentService'
import { fileDocumentService } from '~/services/document/impl/FileDocumentService'
import { temporaryDocumentService } from '~/services/document/impl/TemporaryDocumentService'

class DocumentServiceFactory {
  getDocumentService(key: string): IDocumentService {
    console.log('select key=' + key)
    if (this.isFileDocument(key)) {
      console.log('select FileDocumentService.')
      return fileDocumentService
    }
    if (this.isGenerateDocument(key)) {
      return temporaryDocumentService
    }
    console.log('select ObjectDocumentService.')
    return objectDocumentService
  }

  getAllDocumentServices(): Array<IDocumentService> {
    const services = [] as Array<IDocumentService>
    services.push(objectDocumentService)
    services.push(fileDocumentService)
    services.push(temporaryDocumentService)
    return services
  }

  private isFileDocument(key: string): boolean {
    return key.startsWith('md')
  }

  private isGenerateDocument(key: string): boolean {
    return key.startsWith('gen')
  }
}

export const documentServiceFactory = new DocumentServiceFactory()
