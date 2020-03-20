import { IDocumentService } from '~/services/document/IDocumentService'
import { DocumentMainData, DocumentNodeData, DocumentPageData } from '~/types'

class ObjectDocumentService implements IDocumentService {
  getDocument(documentKey: string): Promise<DocumentMainData> {
    return new Promise<DocumentMainData>((resolve, reject) => {
      const document = createDocument(documentKey)
      if (document === null) {
        reject(new Error(`document not found documentKey=${documentKey}`))
      }
      resolve(document as DocumentMainData)
    })
  }

  getPage(pageKey: string): Promise<DocumentPageData> {
    return new Promise<DocumentPageData>((resolve, reject) => {
      const page = createPage(pageKey)
      if (page === null) {
        reject(new Error(`page not found pageKey=${page}`))
      }
      resolve(page as DocumentPageData)
    })
  }
}

export const objectDocumentService = new ObjectDocumentService()

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

const createPage = (pageKey: string): DocumentPageData | null => {
  for (const page of documentPages) {
    if (page.pageKey === pageKey) {
      return page
    }
  }

  return null
}

const documentNode1: DocumentNodeData = {
  pageTitle: 'ページ0',
  pageKey: 'page0',
  nodes: [
    {
      pageTitle: 'ページ1',
      pageKey: 'page1',
      nodes: []
    },
    {
      pageTitle: 'ページ2',
      pageKey: 'page2',
      nodes: [
        {
          pageTitle: 'ページ3',
          pageKey: 'page3',
          nodes: []
        },
        {
          pageTitle: 'ページ4',
          pageKey: 'page4',
          nodes: [
            {
              pageTitle: 'ページ5',
              pageKey: 'page5',
              nodes: []
            },
            {
              pageTitle: 'ページ6',
              pageKey: 'page6',
              nodes: [
                {
                  pageTitle: 'ページ7',
                  pageKey: 'page7',
                  nodes: []
                },
                {
                  pageTitle: 'ページ8',
                  pageKey: 'page8',
                  nodes: []
                }
              ]
            },
            {
              pageTitle: 'ページ9',
              pageKey: 'page9',
              nodes: []
            }
          ]
        }
      ]
    },
    {
      pageTitle: 'ページ10',
      pageKey: 'page10',
      nodes: []
    }
  ]
}

const documentNode2: DocumentNodeData = {
  pageTitle: 'ページ100',
  pageKey: 'page100',
  nodes: [
    {
      pageTitle: 'ページ101',
      pageKey: 'page101',
      nodes: []
    },
    {
      pageTitle: 'ページ102',
      pageKey: 'page102',
      nodes: []
    }
  ]
}

const nodeMap = new Map<String, DocumentNodeData>([
  ['page0', documentNode1],
  ['page100', documentNode2]
])

const documentPages: Array<DocumentPageData> = [
  {
    documentKey: 'page0',
    pageKey: 'page0',
    pageTitle: 'ページ0のタイトル',
    pageData: 'ページ0のデータ'
  },
  {
    documentKey: 'page0',
    pageKey: 'page1',
    pageTitle: 'ページ1のタイトル',
    pageData: 'ページ1のデータ'
  },
  {
    documentKey: 'page0',
    pageKey: 'page2',
    pageTitle: 'ページ2のタイトル',
    pageData: 'ページ2のデータ'
  },
  {
    documentKey: 'page0',
    pageKey: 'page3',
    pageTitle: 'ページ3のタイトル',
    pageData: 'ページ3のデータ'
  },
  {
    documentKey: 'page0',
    pageKey: 'page4',
    pageTitle: 'ページ4のタイトル',
    pageData: 'ページ4のデータ'
  },
  {
    documentKey: 'page0',
    pageKey: 'page5',
    pageTitle: 'ページ5のタイトル',
    pageData: 'ページ5のデータ'
  },
  {
    documentKey: 'page0',
    pageKey: 'page6',
    pageTitle: 'ページ6のタイトル',
    pageData: 'ページ6のデータ'
  },
  {
    documentKey: 'page0',
    pageKey: 'page7',
    pageTitle: 'ページ7のタイトル',
    pageData: 'ページ7のデータ'
  },
  {
    documentKey: 'page0',
    pageKey: 'page8',
    pageTitle: 'ページ8のタイトル',
    pageData: 'ページ8のデータ'
  },
  {
    documentKey: 'page0',
    pageKey: 'page9',
    pageTitle: 'ページ9のタイトル',
    pageData: 'ページ9のデータ'
  },
  {
    documentKey: 'page0',
    pageKey: 'page10',
    pageTitle: 'ページ10のタイトル',
    pageData: 'ページ10のデータ'
  },
  {
    documentKey: 'page100',
    pageKey: 'page100',
    pageTitle: 'ページ100のタイトル',
    pageData: 'ページ100のデータ'
  },
  {
    documentKey: 'page100',
    pageKey: 'page101',
    pageTitle: 'ページ101のタイトル',
    pageData: 'ページ101のデータ'
  },
  {
    documentKey: 'page100',
    pageKey: 'page102',
    pageTitle: 'ページ102のタイトル',
    pageData: 'ページ102のデータ'
  }
]
