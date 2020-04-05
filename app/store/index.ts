// https://qiita.com/shindex512/items/a90217b9e4c03c5b5215
import {
  getterTree,
  mutationTree,
  actionTree,
  getAccessorType
} from 'typed-vuex'
import * as document from '~/store/document'
import * as page from '~/store/page'
import * as drawer from '~/store/drawer'
import * as headline from '~/store/headline'

export const state = () => ({
  pageKey: '' as string,
  documentKey: '' as string
})

export type RootState = ReturnType<typeof state>

export const getters = getterTree(state, {
  pageKey: state => state.pageKey,
  documentKey: state => state.documentKey
})

export const mutations = mutationTree(state, {
  setPageKey(state, pageKey: string): void {
    state.pageKey = pageKey
  },
  setDocumentKey(state, documentKey: string): void {
    state.documentKey = documentKey
  },
  crearDocumentKey(state): void {
    state.documentKey = ''
  }
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    setPageKey({ commit }, pageKey: string) {
      commit('setPageKey', pageKey)
    },
    setDocumentKey({ commit }, documentKey: string) {
      commit('setDocumentKey', documentKey)
    },
    crearDocumentKey({ commit }) {
      commit('crearDocumentKey')
    }
  }
)

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {
    // import したサブモジュールはここに記述します。
    document,
    page,
    drawer,
    headline
  }
})
