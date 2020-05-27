import { DocumentNodeData } from '~/types'

export const MATCH = Symbol('match')
export const COMPLETE = Symbol('complete')
export const UNMATCH = Symbol('unmatch')

export type MatchState = typeof MATCH | typeof COMPLETE | typeof UNMATCH

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

  appendNextTargetNode(
    targetPageKey: string,
    documentNode: DocumentNodeData,
    newDocumentNode: DocumentNodeData
  ): MatchState {
    if (documentNode.pageKey === targetPageKey) {
      return MATCH
    }

    for (const node of documentNode.nodes) {
      const result = this.appendNextTargetNode(
        targetPageKey,
        node,
        newDocumentNode
      )

      if (result === COMPLETE) {
        return COMPLETE
      }

      if (result === MATCH) {
        this.appendTargetNode(documentNode, node, newDocumentNode)
        return COMPLETE
      }
    }

    return UNMATCH
  }

  private appendTargetNode(
    documentNode: DocumentNodeData,
    matchNode: DocumentNodeData,
    newDocumentNode: DocumentNodeData
  ): void {
    const newNodes = []

    for (const node of documentNode.nodes) {
      newNodes.push(node)
      if (node === matchNode) {
        newNodes.push(newDocumentNode)
      }
    }

    documentNode.nodes = newNodes
  }
}

export const documentNodeNestHandler = new DocumentNodeNestHandler()
