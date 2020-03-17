import { DocumentNodeWrapper } from '~/models/document/DocumentNodeWrapper'

export class DocumentMainWrapper {
  documentKey: string
  node: DocumentNodeWrapper
  constructor(documentKey: string, node: DocumentNodeWrapper) {
    this.documentKey = documentKey
    this.node = node
  }

  // TODO これは必要なのか?
  openTopNodes(): void {
    this.node.expand = true
  }

  openChildren(list: Array<string>): void {
    // topNode.expand = false
    // this.node.closeNodes()
    this.node.expand = false
    // topNode.select = false
    // this.node.unselectNode()
    this.node.select = false
    this.openNode(this.node, list)
  }

  getNestedKeyArray(pageKey: string): Array<string> {
    const keys: Array<string> = []
    return this.getNestedKeys(pageKey, keys, this.node)
  }

  private openNode(targetNode: DocumentNodeWrapper, list: Array<string>): void {
    // node.select = node.pageKey === list[list.length - 1]
    targetNode.select = targetNode.pageKey === list[list.length - 1]
    /*
    if (targetNode.pageKey === list[list.length - 1]) {
      targetNode.selectNode()
    } else {
      targetNode.unselectNode()
    }
     */

    if (!targetNode.nodes || targetNode.nodes.length === 0) {
      return
    }
    // node.expand = !!list.includes(node.pageKey)
    targetNode.expand = list.includes(targetNode.pageKey)
    /*
    if (list.includes(targetNode.pageKey)) {
      targetNode.openNodes()
    } else {
      targetNode.closeNodes()
    }
     */
    if (!targetNode.expand) {
      return
    }
    for (let i = 0; i < targetNode.nodes.length; i++) {
      this.openNode(targetNode.nodes[i], list)
    }
  }

  private getNestedKeys(
    searchPageKey: string,
    keys: Array<string>,
    targetNode: DocumentNodeWrapper
  ): Array<string> {
    const nodePageKey = targetNode.pageKey
    const appendPageKeys = keys.concat(nodePageKey)
    if (nodePageKey === searchPageKey) {
      return appendPageKeys
    }

    for (const node of targetNode.nodes) {
      const returnKeys = this.getNestedKeys(searchPageKey, appendPageKeys, node)
      if (returnKeys.length !== 0) {
        return returnKeys
      }
    }

    return []
  }
}
