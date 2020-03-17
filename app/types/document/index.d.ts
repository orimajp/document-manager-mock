export interface DocumentMainData {
  documentKey: string
  node: DocumentNodeData
}

export interface DocumentPageData {
  documentKey: string
  pageKey: string
  pageTitle: string
  pageData: string
}

export interface DocumentNodeData {
  pageTitle: string
  pageKey: string
  nodes: Array<DocumentNodeData>
}
