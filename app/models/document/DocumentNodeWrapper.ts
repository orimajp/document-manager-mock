import { DocumentNodeData } from '~/types'

export class DocumentNodeWrapper {
  pageTitle: string
  pageKey: string
  expand: boolean
  select: boolean
  nodes: Array<DocumentNodeWrapper>
  constructor(nodeData: DocumentNodeData) {
    this.pageTitle = nodeData.pageTitle
    this.pageKey = nodeData.pageKey
    this.expand = false
    this.select = false
    this.nodes = []
  }

  /*
  openNodes(): void {
    this.expand = true
  }

  closeNodes(): void {
    this.expand = false
  }

  selectNode(): void {
    this.select = true
  }

  unselectNode(): void {
    this.select = false
  }
   */
}
