import { createStore } from 'vuex'
import auth from '@/store/modules/auth.module'
import note from '@/store/modules/note.module'

export default createStore({
  strict: true,
  state() {
    return {
      message: null
    }
  },
  getters: {
    message(state) {
      return state.message
    },
  },
  mutations: {
    setMessage(state, message) {
      state.message = message
    },
    setClearMessage(state) {
      state.message = null
    }
  },
  actions: {
    message({commit}, message) {
      commit('setMessage', message)
      setTimeout(() => commit('setClearMessage'), 5000)
    }
  },
  modules: {
    auth,
    note
  }
})
