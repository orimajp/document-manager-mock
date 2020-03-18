import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { DocumentPageData } from '~/types'
import { documentService2 } from '~/services/DocumentService2'
import { DocumentPageHolder } from '~/models/document/DocumentPageHolder'
import { DocumentPageWrapper } from '~/models/document/DocumentPageWrapper'

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
  setPage(state, pair: [string, DocumentPageWrapper]): void {
    state.pageHolder.addPage(pair[0], pair[1])
  }
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    // TODO 現状はマップに無いページは必ずデータを取得する処理。実際の処理では新しいページがある場合のみ置き換える
    fetchPage({ getters, commit }, pageKey: string) {
      const pageData = getters.getPage(pageKey)
      if (pageData === null) {
        return documentService2
          .getPage(pageKey)
          .then((page: DocumentPageData) => {
            console.log(`commit#setPage=${JSON.stringify(page)}`)
            const wrapper = new DocumentPageWrapper(page)
            commit('setPage', [pageKey, wrapper])
          })
      }
    },
    clearAllPages({ commit }) {
      commit('clearAllPages')
    }
  }
)
