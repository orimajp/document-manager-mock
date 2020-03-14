import {
  DocumentMain,
  DocumentNode,
  DocumentNodeField,
  DocumentNodeImpl,
  DocumentPage
} from '~/models/DocumentModel'

class DocumentService {
  getDocument(documentKey: string): Promise<DocumentMain> {
    return new Promise<DocumentMain>((resolve, reject) => {
      const document = createDocument(documentKey)
      if (document === null) {
        reject(new Error(`document not found documentKey=${documentKey}`))
      }
      resolve(document as DocumentMain)
    })
  }

  getPage(pageKey: string): Promise<DocumentPage> {
    return new Promise<DocumentPage>((resolve, reject) => {
      const page = createPage(pageKey)
      if (page === null) {
        reject(new Error(`page not found pageKey=${page}`))
      }
      resolve(page as DocumentPage)
    })
  }
}

export const documentService = new DocumentService()

const createDocument = (documentKey: string): DocumentMain | null => {
  const documentNode = nodeMap.get(documentKey)
  if (documentNode === undefined) {
    return null
  }

  return {
    documentKey,
    node: documentNode
  } as DocumentMain | null
}

const createPage = (pageKey: string): DocumentPage | null => {
  for (const page of documentPages) {
    if (page.pageKey === pageKey) {
      return page
    }
  }

  return null
}

const createDocumentNode = (
  documentNodeField: DocumentNodeField
): DocumentNode => {
  const topNode = new DocumentNodeImpl(documentNodeField)
  for (const field of documentNodeField.nodes) {
    const node = createNestNode(field, topNode)
    topNode.nodes.push(node)
  }
  return topNode
}

const createNestNode = (
  currentField: DocumentNodeField,
  currentNode: DocumentNode
): DocumentNode => {
  const newNode = new DocumentNodeImpl(currentField)
  for (const field of currentField.nodes) {
    const node = createNestNode(field, currentNode)
    node.nodes.push(node)
  }
  return newNode
}

/*
const documentNode1: DocumentNode = {
  pageTitle: 'ページ0',
  pageKey: 'page0',
  expand: false,
  select: false,
  nodes: [
    {
      pageTitle: 'ページ1',
      pageKey: 'page1',
      expand: false,
      select: false,
      nodes: []
    },
    {
      pageTitle: 'ページ2',
      pageKey: 'page2',
      expand: false,
      select: false,
      nodes: [
        {
          pageTitle: 'ページ3',
          pageKey: 'page3',
          expand: false,
          select: false,
          nodes: []
        },
        {
          pageTitle: 'ページ4',
          pageKey: 'page4',
          expand: false,
          select: false,
          nodes: [
            {
              pageTitle: 'ページ5',
              pageKey: 'page5',
              expand: false,
              select: false,
              nodes: []
            },
            {
              pageTitle: 'ページ6',
              pageKey: 'page6',
              expand: false,
              select: false,
              nodes: [
                {
                  pageTitle: 'ページ7',
                  pageKey: 'page7',
                  expand: false,
                  select: false,
                  nodes: []
                },
                {
                  pageTitle: 'ページ8',
                  pageKey: 'page8',
                  expand: false,
                  select: false,
                  nodes: []
                }
              ]
            },
            {
              pageTitle: 'ページ9',
              pageKey: 'page9',
              expand: false,
              select: false,
              nodes: []
            }
          ]
        }
      ]
    },
    {
      pageTitle: 'ページ10',
      pageKey: 'page10',
      expand: false,
      select: false,
      nodes: []
    }
  ]
}
 */

/*
const documentNode2: DocumentNode = {
  pageTitle: 'ページ100',
  pageKey: 'page100',
  expand: false,
  select: false,
  nodes: [
    {
      pageTitle: 'ページ101',
      pageKey: 'page101',
      expand: false,
      select: false,
      nodes: []
    },
    {
      pageTitle: 'ページ102',
      pageKey: 'page102',
      expand: false,
      select: false,
      nodes: []
    }
  ]
}
*/

const documentNodeField1: DocumentNodeField = {
  pageTitle: 'ページ0',
  pageKey: 'page0',
  expand: false,
  select: false,
  nodes: [
    {
      pageTitle: 'ページ1',
      pageKey: 'page1',
      expand: false,
      select: false,
      nodes: []
    },
    {
      pageTitle: 'ページ2',
      pageKey: 'page2',
      expand: false,
      select: false,
      nodes: [
        {
          pageTitle: 'ページ3',
          pageKey: 'page3',
          expand: false,
          select: false,
          nodes: []
        },
        {
          pageTitle: 'ページ4',
          pageKey: 'page4',
          expand: false,
          select: false,
          nodes: [
            {
              pageTitle: 'ページ5',
              pageKey: 'page5',
              expand: false,
              select: false,
              nodes: []
            },
            {
              pageTitle: 'ページ6',
              pageKey: 'page6',
              expand: false,
              select: false,
              nodes: [
                {
                  pageTitle: 'ページ7',
                  pageKey: 'page7',
                  expand: false,
                  select: false,
                  nodes: []
                },
                {
                  pageTitle: 'ページ8',
                  pageKey: 'page8',
                  expand: false,
                  select: false,
                  nodes: []
                }
              ]
            },
            {
              pageTitle: 'ページ9',
              pageKey: 'page9',
              expand: false,
              select: false,
              nodes: []
            }
          ]
        }
      ]
    },
    {
      pageTitle: 'ページ10',
      pageKey: 'page10',
      expand: false,
      select: false,
      nodes: []
    }
  ]
}

const documentNodeField2: DocumentNodeField = {
  pageTitle: 'ページ100',
  pageKey: 'page100',
  expand: false,
  select: false,
  nodes: [
    {
      pageTitle: 'ページ101',
      pageKey: 'page101',
      expand: false,
      select: false,
      nodes: []
    },
    {
      pageTitle: 'ページ102',
      pageKey: 'page102',
      expand: false,
      select: false,
      nodes: []
    }
  ]
}

const documentNode1: DocumentNode = createDocumentNode(documentNodeField1)

const documentNode2: DocumentNode = createDocumentNode(documentNodeField2)

const nodeMap = new Map<String, DocumentNode>([
  ['page0', documentNode1],
  ['page100', documentNode2]
])

const documentPages: Array<DocumentPage> = [
  {
    documentKey: 'page0',
    pageKey: 'page0',
    pageTitle: 'ページ0のタイトル',
    pageData: 'ページ0のデータ'
  },
  {
    documentKey: 'page1',
    pageKey: 'page1',
    pageTitle: 'ページ1のタイトル',
    pageData: 'ページ1のデータ'
  },
  {
    documentKey: 'page2',
    pageKey: 'page2',
    pageTitle: 'ページ2のタイトル',
    pageData: 'ページ2のデータ'
  },
  {
    documentKey: 'page3',
    pageKey: 'page3',
    pageTitle: 'ページ3のタイトル',
    pageData: 'ページ3のデータ'
  },
  {
    documentKey: 'page4',
    pageKey: 'page4',
    pageTitle: 'ページ4のタイトル',
    pageData: 'ページ4のデータ'
  },
  {
    documentKey: 'page5',
    pageKey: 'page5',
    pageTitle: 'ページ5のタイトル',
    pageData: 'ページ5のデータ'
  },
  {
    documentKey: 'page6',
    pageKey: 'page6',
    pageTitle: 'ページ6のタイトル',
    pageData: 'ページ6のデータ'
  },
  {
    documentKey: 'page7',
    pageKey: 'page7',
    pageTitle: 'ページ7のタイトル',
    pageData: 'ページ7のデータ'
  },
  {
    documentKey: 'page8',
    pageKey: 'page8',
    pageTitle: 'ページ8のタイトル',
    pageData: 'ページ8のデータ'
  },
  {
    documentKey: 'page9',
    pageKey: 'page9',
    pageTitle: 'ページ9のタイトル',
    pageData: 'ページ9のデータ'
  },
  {
    documentKey: 'page10',
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
    documentKey: 'page101',
    pageKey: 'page101',
    pageTitle: 'ページ101のタイトル',
    pageData: 'ページ101のデータ'
  },
  {
    documentKey: 'page102',
    pageKey: 'page102',
    pageTitle: 'ページ102のタイトル',
    pageData: 'ページ102のデータ'
  }
]
