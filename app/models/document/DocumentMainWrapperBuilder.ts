import { DocumentMainData } from '~/types'
import { DocumentNodeWrapperBuilder } from '~/models/document/DocumentNodeWrapperBuilder'
import { DocumentMainWrapper } from '~/models/document/DocumentMainWrapper'

export class DocumentMainWrapperBuilder {
  private readonly document: DocumentMainData
  constructor(document: DocumentMainData) {
    this.document = document
  }

  createDocument(): DocumentMainWrapper {
    const nodeWrapperBuilder = new DocumentNodeWrapperBuilder(
      this.document.node
    )
    const documentNodeWrapper = nodeWrapperBuilder.createTopNode()
    return new DocumentMainWrapper(
      this.document.documentKey,
      documentNodeWrapper
    )
  }
}
