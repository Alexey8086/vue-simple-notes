import { createStore } from 'vuex'
import auth from '@/store/modules/auth.module'
import note from '@/store/modules/note.module'

export default createStore({
  strict: true,
  state() {
    return {
      message: null,
      theme: localStorage.getItem('theme'),
    }
  },
  getters: {
    message(state) {
      return state.message
    },
    theme(state) {
      return state.theme
    },
  },
  mutations: {
    setMessage(state, message) {
      state.message = message
    },
    setClearMessage(state) {
      state.message = null
    },
    setTheme (state, theme) {
      state.theme = theme
      localStorage.setItem('theme', theme)
    }
  },
  actions: {
    message({commit}, message) {
      commit('setMessage', message)
      setTimeout(() => commit('setClearMessage'), 5000)
    },
    changeTheme({commit}, theme) {
      commit('setTheme', theme)
    }

  },
  modules: {
    auth,
    note
  }
})
