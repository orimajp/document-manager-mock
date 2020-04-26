import { DocumentMainData } from '~/types'
import { DocumentNodeBuilder } from '~/models/document/DocumentNodeBuilder'
import { DocumentMain } from '~/models/document/DocumentMain'

export class DocumentMainBuilder {
  private readonly document: DocumentMainData
  constructor(document: DocumentMainData) {
    this.document = document
  }

  createDocument(): DocumentMain {
    const nodeWrapperBuilder = new DocumentNodeBuilder(this.document.node)
    const documentNodeWrapper = nodeWrapperBuilder.createTopNode()
    return new DocumentMain(this.document.documentKey, documentNodeWrapper)
  }
}
