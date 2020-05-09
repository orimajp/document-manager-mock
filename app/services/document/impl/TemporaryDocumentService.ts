import { IDocumentService } from '~/services/document/IDocumentService'
import { DocumentMain } from '~/models/document/DocumentMain'
import { DocumentPage } from '~/models/document/DocumentPage'
import { DocumentMainData, DocumentNodeData, DocumentPageData } from '~/types'
import { DocumentListRecord } from '~/models/document/DocumentListRecord'
import { NewDocumentData } from '~/models/document/NewDocumentData'
import { DocumentMainBuilder } from '~/models/document/DocumentMainBuilder'
import { NewPageData } from '~/models/document/NewPageData'

export class TemporaryDocumentService implements IDocumentService {
  getDocument(documentKey: string): Promise<DocumentMain> {
    return new Promise<DocumentMain>((resolve, reject) => {
      console.log(documentKey)
      const document = documentMainDatas.get(documentKey)
      if (document === undefined) {
        reject(new Error(`document not found documentKey=${documentKey}`))
      }
      const builder = new DocumentMainBuilder(document as DocumentMainData)
      resolve(builder.createDocument())
    })
  }

  getPage(pageKey: string): Promise<DocumentPage> {
    return new Promise<DocumentPage>((resolve, reject) => {
      console.log(pageKey)
      const page = pageDatas.get(pageKey)
      if (page === undefined) {
        reject(new Error(`page not found pageKey=${page}`))
      }
      resolve(page)
    })
  }

  getRowDocument(documentKey: string): Promise<DocumentMainData> {
    return new Promise<DocumentMainData>((resolve, reject) => {
      console.log(documentKey)
      const document = documentMainDatas.get(documentKey)
      if (document === null) {
        reject(new Error(`document not found documentKey=${documentKey}`))
      }
      resolve(document)
    })
  }

  getRowPage(pageKey: string): Promise<DocumentPageData> {
    return new Promise<DocumentPageData>((resolve, reject) => {
      console.log(pageKey)
      const page = pageDatas.get(pageKey)
      if (page === undefined) {
        reject(new Error(`page not found pageKey=${pageKey}`))
      }
      resolve(page)
    })
  }

  registerDocumentPage(pageData: DocumentPage): DocumentPage {
    // あまり意味が無いような？
    console.log(pageData)
    pageDatas.set(pageData.pageKey, pageData)
    return pageData
  }

  updateDocumentPage(pageData: DocumentPage): void {
    console.log(pageData)
    const page = pageDatas.get(pageData.pageKey)
    if (page === undefined) {
      throw new Error(`page not found pageKey=${pageData.pageKey}`)
    }
    page.pageTitle = pageData.pageTitle
    page.pageData = pageData.pageData
  }

  updateRowDocumentNodes(
    documentKey: string,
    nodes: Array<DocumentNodeData>
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const document = documentMainDatas.get(documentKey)
      if (document === undefined) {
        reject(new Error(`document not found documentKey=${documentKey}`))
      }
      const node = (document as DocumentMainData).node
      node.nodes = nodes
      resolve()
    })
  }

  updateRowDocumentPage(pageData: DocumentPageData): void {
    console.log(pageData)
    const page = pageDatas.get(pageData.pageKey)
    if (page === undefined) {
      throw new Error(`page not found pageKey=${pageData.pageKey}`)
    }
    page.pageTitle = pageData.pageTitle
    page.pageData = pageData.pageData
  }

  getDocumentList(): Array<DocumentListRecord> {
    return records
  }

  registerDocument(
    documentKey: string,
    newDocumentData: NewDocumentData
  ): Promise<void> {
    return new Promise<void>(resolve => {
      const documentData = {
        documentKey,
        node: {
          pageTitle: newDocumentData.title,
          pageKey: documentKey,
          nodes: [] as Array<DocumentNodeData>
        }
      } as DocumentMainData
      documentMainDatas.set(documentKey, documentData)

      const record = {
        pageName: newDocumentData.title,
        documentKey
      } as DocumentListRecord
      records.push(record)

      const pageData = {
        documentKey,
        pageKey: documentKey,
        pageTitle: newDocumentData.title,
        pageData: newDocumentData.documentData
      } as DocumentPage
      pageDatas.set(documentKey, pageData)
      resolve()
    })
  }

  registerPage(pageKey: string, newPageData: NewPageData): Promise<void> {
    return new Promise<void>(resolve => {
      const node = {
        pageTitle: newPageData.title,
        pageKey,
        nodes: [] as Array<DocumentNodeData>
      } as DocumentNodeData

      const documentKey = newPageData.documentKey

      const documentData = documentMainDatas.get(
        documentKey
      ) as DocumentMainData

      const nodes = documentData.node.nodes
      nodes.unshift(node)

      const pageData = {
        documentKey,
        pageKey,
        pageTitle: newPageData.title,
        pageData: newPageData.pageData
      } as DocumentPage
      pageDatas.set(pageKey, pageData)

      resolve()
    })
  }
}

export const temporaryDocumentService = new TemporaryDocumentService()

// ドキュメントリスト表示用
const records: Array<DocumentListRecord> = []

// ページデータマップ
const pageDatas = new Map<String, DocumentPage>()

// ドキュメントデータマップ
const documentMainDatas = new Map<String, DocumentMainData>()
