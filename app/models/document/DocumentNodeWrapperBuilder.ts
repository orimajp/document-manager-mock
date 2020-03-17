import { DocumentNodeData } from '~/types'
import { DocumentNodeWrapper } from '~/models/document/DocumentNodeWrapper'

export class DocumentNodeWrapperBuilder {
  private readonly topNodeData: DocumentNodeData

  constructor(nodeData: DocumentNodeData) {
    this.topNodeData = nodeData
  }

  createTopNode(): DocumentNodeWrapper {
    const topnodeWrapper = new DocumentNodeWrapper(this.topNodeData)
    for (const data of this.topNodeData.nodes) {
      this.createNestedNode(data, topnodeWrapper)
    }
    return topnodeWrapper
  }

  private createNestedNode(
    currentData: DocumentNodeData,
    currentWrapper: DocumentNodeWrapper
  ): void {
    const newWrapper = new DocumentNodeWrapper(currentData)
    currentWrapper.nodes.push(newWrapper)
    for (const data of currentData.nodes) {
      this.createNestedNode(data, newWrapper)
    }
  }
}
