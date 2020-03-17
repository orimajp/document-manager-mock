import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { DocumentPageData } from '~/types'
import { documentService2 } from '~/services/DocumentService2'
import { DocumentPageHolder } from '~/models/document/DocumentPageHolder'
import { DocumentPageWrapper } from '~/models/document/DocumentPageWrapper'
// import { DocumentPage } from '~/models/DocumentModel'
// import { documentService } from '~/services/DocumentService'

// const tmp = new Map<string, DocumentPageData>()
const holder = new DocumentPageHolder()

export const state = () => ({
  // pageMap: tmp,
  pageHolder: holder
})

export type RootState = ReturnType<typeof state>

export const getters = getterTree(state, {
  // pageMap: state => state.pageMap
  // paee: (state, pageKey) => state.pageHolder.getPage(pageKey)
  // pageHolder: state => state.pageHolder,
  getPage: state => (pageKey: string) => {
    return state.pageHolder.getPage(pageKey)
  }
})

export const mutations = mutationTree(state(), {
  /*
  initialPageMap(state): void {
    // state.pageMap.clear()
    state.pageHolder.clearPageCache()
  },
  */
  clearAllPages(state): void {
    state.pageHolder.clearPageCache()
  },
  /*
  setPageMap(state, pageMap: Map<string, DocumentPageData>): void {
    state.pageMap = pageMap
  },
   */
  // setPage(state, { pageKey, page }): void {
  setPage(state, pair: [string, DocumentPageWrapper]): void {
    // state.pageMap.set(pageKey, page)
    state.pageHolder.addPage(pair[0], pair[1])
  }
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    // TODO 現状はマップに無いページは必ずデータを取得する処理。実際の処理では新しいページがある場合のみ置き換える
    fetchPage({ getters, commit }, pageKey: string) {
      // const pageData = getters.pageHolder.getPage(pageKey)
      const pageData = getters.getPage(pageKey)
      if (pageData === null) {
        return documentService2
          .getPage(pageKey)
          .then((page: DocumentPageData) => {
            console.log(`commit#setPage=${JSON.stringify(page)}`)
            const wrapper = new DocumentPageWrapper(page)
            // commit('setPage', { pageKey, wrapper })
            commit('setPage', [pageKey, wrapper])
          })
      }
      /*
      const map = getters.pageMap
      const page = map.get(pageKey)
      if (page === undefined) {
        return documentService2
          .getPage(pageKey)
          .then((page: DocumentPageData) => {
            console.log(`commit#setPage=${JSON.stringify(page)}`)
            commit('setPage', { pageKey, page })
          })
      }
       */
    },
    clearAllPages({ commit }) {
      // commit('initialPageMap')
      commit('clearAllPages')
    }
  }
)
