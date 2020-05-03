import { documentServiceFactory } from '~/services/document/DocumentServiceFactory'
import { IDocumentService } from '~/services/document/IDocumentService'
import { DocumentMain } from '~/models/document/DocumentMain'
import { DocumentPage } from '~/models/document/DocumentPage'
import { DocumentMainData, DocumentNodeData, DocumentPageData } from '~/types'
import { pageKeyFactory } from '~/services/document/PageKeyFactory'
import { DocumentListRecord } from '~/models/document/DocumentListRecord'
import { NewDocumentData } from '~/models/document/NewDocumentData'

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

  // 正直これは使えない(所属元のdocumentKeyが無いため)
  registerDocumentPage(pageData: DocumentPage): DocumentPage {
    const pageKey = pageKeyFactory.createPageKey()
    pageData.pageKey = pageKey
    return getDocumentService(pageKey).registerDocumentPage(pageData)
  }

  getDocumentList(): Array<DocumentListRecord> {
    const records = [] as Array<DocumentListRecord>
    for (const service of documentServiceFactory.getAllDocumentServices()) {
      for (const record of service.getDocumentList()) {
        records.push(record)
      }
    }
    console.log(JSON.stringify(records))
    return records
  }

  registerDocument(
    documentKey: string,
    newDocumentData: NewDocumentData
  ): Promise<void> {
    return getDocumentService(documentKey).registerDocument(
      documentKey,
      newDocumentData
    )
  }

  async registerNewDocument(newDocumentData: NewDocumentData): Promise<String> {
    const pageKey = pageKeyFactory.createPageKey()
    await this.registerDocument(pageKey, newDocumentData)
    return pageKey
  }
}

const getDocumentService = (documentKey: string): IDocumentService => {
  return documentServiceFactory.getDocumentService(documentKey)
}

export const documentService = new DocumentService()
