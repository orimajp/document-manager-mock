import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { DocumentMain } from '~/models/document/DocumentMain'
import { documentServiceFactory } from '~/services/document/DocumentServiceFactory'
import { IDocumentService } from '~/services/document/IDocumentService'

export const state = () => ({
  document: {
    documentKey: '',
    node: {}
  } as DocumentMain
})

export type RootState = ReturnType<typeof state>

export const getters = getterTree(state, {
  document: state => state.document,
  // これを呼べない
  getNesTedKeyArray: state => (pageKey: string): Array<string> => {
    return state.document.getNestedKeyArray(pageKey)
  }
})

export const mutations = mutationTree(state, {
  setDocument(state, document: DocumentMain): void {
    state.document = document
  },
  openChildren(state, list: Array<string>): void {
    state.document.openChildren(list)
  }
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    fetchDocument({ commit }, documentKey: string) {
      return getDocumentService(documentKey)
        .getDocument(documentKey)
        .then((document: DocumentMain) => {
          commit('setDocument', document)
        })
    },
    openChildren({ commit }, list: Array<string>) {
      commit('openChildren', list)
    }
  }
)

const getDocumentService = (documentKey: string): IDocumentService => {
  return documentServiceFactory.getDocumentService(documentKey)
}
