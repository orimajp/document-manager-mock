import { DocumentNodeData } from '~/types'

export class DocumentNode {
  pageTitle: string
  pageKey: string
  expand: boolean
  select: boolean
  nodes: Array<DocumentNode>
  constructor(nodeData: DocumentNodeData) {
    this.pageTitle = nodeData.pageTitle
    this.pageKey = nodeData.pageKey
    this.expand = false
    this.select = false
    this.nodes = []
  }
}
