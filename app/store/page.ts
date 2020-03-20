import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { DocumentPageData } from '~/types'
import { DocumentPageHolder } from '~/models/document/DocumentPageHolder'
import { DocumentPage } from '~/models/document/DocumentPage'
import { IDocumentService } from '~/services/document/IDocumentService'
import { documentServiceFactory } from '~/services/document/DocumentServiceFactory'

const holder = new DocumentPageHolder()

export const state = () => ({
  pageHolder: holder
})

export type RootState = ReturnType<typeof state>

export const getters = getterTree(state, {
  getPage: state => (pageKey: string) => {
    return state.pageHolder.getPage(pageKey)
  }
})

export const mutations = mutationTree(state(), {
  clearAllPages(state): void {
    state.pageHolder.clearPageCache()
  },
  setPage(state, pair: [string, DocumentPage]): void {
    state.pageHolder.addPage(pair[0], pair[1])
  }
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    // TODO 現状はマップに無いページは必ずデータを取得する処理。実際の処理では新しいページがある場合のみ置き換える
    fetchPage({ getters, commit }, pageKey: string) {
      const cachedPageData = getters.getPage(pageKey)
      if (cachedPageData === null) {
        return getDocumentService(pageKey)
          .getPage(pageKey)
          .then((pageData: DocumentPageData) => {
            console.log(`commit#setPage=${JSON.stringify(pageData)}`)
            const page = new DocumentPage(pageData)
            commit('setPage', [pageKey, page])
          })
      }
    },
    clearAllPages({ commit }) {
      commit('clearAllPages')
    }
  }
)

const getDocumentService = (pageKey: string): IDocumentService => {
  return documentServiceFactory.getDocumentService(pageKey)
}
