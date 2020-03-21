import { IDocumentService } from '~/services/document/IDocumentService'
import { DocumentMainData, DocumentNodeData, DocumentPageData } from '~/types'

class FileDocumentService implements IDocumentService {
  getDocument(documentKey: string): Promise<DocumentMainData> {
    console.log(documentKey)
    return new Promise<DocumentMainData>((resolve, reject) => {
      const document = createDocument(documentKey)
      if (document === null) {
        reject(new Error(`document not found documentKey=${documentKey}`))
      }
      resolve(document as DocumentMainData)
    })
  }

  getPage(pageKey: string): Promise<DocumentPageData> {
    console.log(pageKey)
    return new Promise<DocumentPageData>(resolve => {
      const page = getPage(pageKey)
      resolve(page)
    })
  }
}

export const fileDocumentService = new FileDocumentService()

const createDocument = (documentKey: string): DocumentMainData | null => {
  const documentNode = nodeMap.get(documentKey)
  if (documentNode === undefined) {
    return null
  }

  return {
    documentKey,
    node: documentNode
  } as DocumentMainData | null
}

const getDocumentKey = (pageKey: string): string => {
  const documentKey = pageToDocument.get(pageKey)
  if (documentKey === undefined) {
    throw new Error(`DocumentKey not registerd. pageKey=${pageKey}`)
  }
  return documentKey
}

const getPage = (pageKey: string): DocumentPageData => {
  const page = {} as DocumentPageData
  page.pageKey = pageKey
  page.documentKey = getDocumentKey(pageKey)
  page.pageTitle = `マークダウン:${pageKey}`
  // page.pageData = require(`~/contents/${pageKey}.md`)
  // page.pageData = await import(`~/contents/${pageKey}.md`)
  // page.pageData = ''
  /*
  page.pageData = `
  # マークダウンテスト
  `
   */
  page.pageData = convertCr(dummyPageData)

  return page
}

const convertCr = (page: string): string => {
  const cr = '0A'
  const crCode = String.fromCharCode(parseInt(cr, 16))
  return page.replace(/\\n/g, crCode)
}

// ファイル読み取りに苦戦しているのでとりあえずデータ定義で逃げる
const dummyPageData = `
# (見出し1)
## (見出し2)
### (見出し3)
#### (見出し4)
##### (見出し5)
###### (見出し6)
`

const documentNode1 = {
  pageTitle: 'マークダウン:md-page0',
  pageKey: 'md-page0',
  nodes: []
}

const documentNode100 = {
  pageTitle: 'マークダウン:md-page100',
  pageKey: 'md-page100',
  nodes: []
}

const nodeMap = new Map<String, DocumentNodeData>([
  ['md-page0', documentNode1],
  ['md-page100', documentNode100]
])

const pageToDocument = new Map<string, string>([
  ['md-page0', 'md-page0'],
  ['md-page100', 'md-page100']
])
