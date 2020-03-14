import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { DocumentPage } from '~/models/DocumentModel'
import { documentService } from '~/services/DocumentService'

const tmp = new Map<string, DocumentPage>()

export const state = () => ({
  // pageMap: {} as Map<string, DocumentPage>
  pageMap: tmp
})

export type RootState = ReturnType<typeof state>

export const getters = getterTree(state, {
  pageMap: state => state.pageMap
})

export const mutations = mutationTree(state(), {
  initialPageMap(state): void {
    // state.pageMap = {} as Map<string, DocumentPage>
    state.pageMap.clear()
  },
  setPageMap(state, pageMap: Map<string, DocumentPage>): void {
    state.pageMap = pageMap
  },
  setPage(state, { pageKey, page }): void {
    state.pageMap.set(pageKey, page)
  }
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    // TODO 現状はマップに無いページは必ずデータを取得する処理。実際の処理では新しいページがある場合のみ置き換える
    fetchPage({ getters, commit }, pageKey: string) {
      const map = getters.pageMap
      const page = map.get(pageKey)
      if (page === undefined) {
        return documentService.getPage(pageKey).then((page: DocumentPage) => {
          console.log(`commit#setPage=${JSON.stringify(page)}`)
          commit('setPage', { pageKey, page })
        })
      }
      // return page
    },
    clearAllPages({ commit }) {
      commit('initialPageMap')
    }
  }
)
