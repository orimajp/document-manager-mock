export interface DocumentMain {
  documentKey: string
  node: DocumentNode
}

export interface DocumentPage {
  documentKey: string
  pageKey: string
  pageTitle: string
  pageData: string
}

export interface DocumentNode {
  pageTitle: string
  pageKey: string
  expand: boolean
  select: boolean
  nodes: Array<DocumentNode>

  openNodes(): void
  closeNodes(): void
  selectNode(): void
  unselectNode(): void
}

export interface DocumentMainField {
  documentKey: string
  node: DocumentNodeField
}

export interface DocumentNodeField {
  pageTitle: string
  pageKey: string
  expand: boolean
  select: boolean
  nodes: Array<DocumentNodeField>
}

export class DocumentNodeImpl implements DocumentNode {
  private node: DocumentNode = {} as DocumentNode
  constructor(node: DocumentNodeField) {
    this.node.pageTitle = node.pageTitle
    this.node.pageKey = node.pageKey
    this.node.expand = node.expand
    this.node.select = node.select
    this.node.nodes = []
  }

  addNodes(nodes: Array<DocumentNode>) {
    for (const tmpNode of nodes) {
      this.node.nodes.push(tmpNode)
    }
  }

  openNodes(): void {
    console.log('openNode(): called.')
    this.node.expand = true
  }

  closeNodes(): void {
    this.node.expand = false
  }

  selectNode(): void {
    this.node.select = true
  }

  unselectNode(): void {
    this.node.select = false
  }

  get pageTitle(): string {
    return this.node.pageTitle
  }

  get pageKey(): string {
    return this.node.pageKey
  }

  get expand(): boolean {
    return this.node.expand
  }

  get select(): boolean {
    return this.node.select
  }

  get nodes(): Array<DocumentNode> {
    return this.node.nodes
  }
}
