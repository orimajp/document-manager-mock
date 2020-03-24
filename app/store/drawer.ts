import { getterTree, mutationTree, actionTree } from 'typed-vuex'

export const state = () => ({
  permanent: true,
  drawer: false
})

export type RootState = ReturnType<typeof state>

export const getters = getterTree(state, {
  permanent: state => state.permanent,
  drawer: state => state.drawer
})

export const mutations = mutationTree(state, {
  setPermanent(state, permanent: boolean): void {
    state.permanent = permanent
  },
  setDrawer(state, drawer: boolean): void {
    state.drawer = drawer
  }
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    setPermanent({ commit }, permanent: boolean) {
      commit('setPermanent', permanent)
    },
    setDrawer({ commit }, drawer: boolean) {
      commit('setDrawer', drawer)
    }
  }
)
