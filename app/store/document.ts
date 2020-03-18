import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { DocumentMainData } from '~/types'
import { documentService } from '~/services/DocumentService'
import { DocumentMain } from '~/models/document/DocumentMain'
import { DocumentMainBuilder } from '~/models/document/DocumentMainBuilder'

export const state = () => ({
  document: {} as DocumentMain
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
      return documentService
        .getDocument(documentKey)
        .then((document: DocumentMainData) => {
          const builder = new DocumentMainBuilder(document)
          commit('setDocument', builder.createDocument())
        })
    },
    openChildren({ commit }, list: Array<string>) {
      commit('openChildren', list)
    }
  }
)
