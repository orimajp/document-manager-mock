import { DocumentNodeData } from '~/types'
import { DocumentNode } from '~/models/document/DocumentNode'

export class DocumentNodeBuilder {
  private readonly topNodeData: DocumentNodeData

  constructor(nodeData: DocumentNodeData) {
    this.topNodeData = nodeData
  }

  createTopNode(): DocumentNode {
    const topnodeWrapper = new DocumentNode(this.topNodeData)
    for (const data of this.topNodeData.nodes) {
      this.createNestedNode(data, topnodeWrapper)
    }
    return topnodeWrapper
  }

  private createNestedNode(
    currentData: DocumentNodeData,
    currentWrapper: DocumentNode
  ): void {
    const newWrapper = new DocumentNode(currentData)
    currentWrapper.nodes.push(newWrapper)
    for (const data of currentData.nodes) {
      this.createNestedNode(data, newWrapper)
    }
  }
}
