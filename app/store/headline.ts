import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { DocumentHeadline } from '~/models/document/DocumentHeadline'

export const state = () => ({
  headlines: [] as Array<DocumentHeadline>
})

export type RootState = ReturnType<typeof state>

export const getters = getterTree(state, {
  headlines: state => state.headlines
})

export const mutations = mutationTree(state, {
  addHeadline2(state, headline: DocumentHeadline): void {
    state.headlines.push(headline)
  },
  clearHeadlines(state): void {
    state.headlines = [] as Array<DocumentHeadline>
  }
})

export const actions = actionTree(
  { state, mutations },
  {
    addHeadline({ commit }, headline: DocumentHeadline) {
      commit('addHeadline2', headline)
    },
    clearHeadlines({ commit }) {
      commit('clearHeadlines')
    }
  }
)
