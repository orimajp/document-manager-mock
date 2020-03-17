import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { DocumentMainData } from '~/types'
import { documentService2 } from '~/services/DocumentService2'
import { DocumentMainWrapper } from '~/models/document/DocumentMainWrapper'
import { DocumentMainWrapperBuilder } from '~/models/document/DocumentMainWrapperBuilder'
// import { DocumentMain } from '~/models/DocumentModel'
// import { documentService } from '~/services/DocumentService'

export const state = () => ({
  document: {} as DocumentMainWrapper
})

export type RootState = ReturnType<typeof state>

export const getters = getterTree(state, {
  document: state => state.document,
  getNesTedKeyArray: state => (pageKey: string) => {
    return state.document.getNestedKeyArray(pageKey)
  }
})

export const mutations = mutationTree(state, {
  setDocument(state, document: DocumentMainWrapper): void {
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
      return documentService2
        .getDocument(documentKey)
        .then((document: DocumentMainData) => {
          const builder = new DocumentMainWrapperBuilder(document)
          commit('setDocument', builder.createDocument())
        })
    },
    openChildren({ commit }, list: Array<string>) {
      commit('openChildren', list)
    }
  }
)
