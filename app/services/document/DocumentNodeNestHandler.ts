import { DocumentNodeData } from '~/types'

class DocumentNodeNestHandler {
  prevendChileTargetNode(
    targetPageKey: string,
    documentNode: DocumentNodeData,
    newDocumentNode: DocumentNodeData
  ): boolean {
    if (documentNode.pageKey === targetPageKey) {
      documentNode.nodes.unshift(newDocumentNode)
      return true
    }

    for (const node of documentNode.nodes) {
      const result = this.prevendChileTargetNode(
        targetPageKey,
        node,
        newDocumentNode
      )
      if (result) {
        return true
      }
    }

    return false
  }
}

export const documentNodeNestHandler = new DocumentNodeNestHandler()
