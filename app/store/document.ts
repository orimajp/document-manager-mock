import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { DocumentMain } from '~/models/DocumentModel'
import { documentService } from '~/services/DocumentService'

export const state = () => ({
  document: {} as DocumentMain
})

export type RootState = ReturnType<typeof state>

export const getters = getterTree(state, {
  document: state => state.document
})

export const mutations = mutationTree(state, {
  setDocument(state, document: DocumentMain): void {
    state.document = document
  }
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    fetchDocument({ commit }, documentKey: string) {
      return documentService
        .getDocument(documentKey)
        .then((document: DocumentMain) => {
          commit('setDocument', document)
        })
    }
  }
)
