import axios from 'node_modules/axios'
// кастомная обработка ошибок
import { error } from '@/utils/error'
const TOKEN_KEY = 'jwt-token'
const LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_DB_KEY}`
const REGISTR_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_DB_KEY}`


export default {
    namespaced: true,
    state() {
        return {
            token: localStorage.getItem(TOKEN_KEY)
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            localStorage.setItem(TOKEN_KEY, token)
        },
        setLogout(state) {
            state.token = null
            localStorage.removeItem(TOKEN_KEY)
        }
    },
    actions: {
        async login({commit, dispatch}, payload) {
            try {
                const {data} = await axios.post(LOGIN_URL, { ...payload, returnSecureToken: true })
                commit('setToken', data.idToken)
                commit('clearMessage', null, {root: true})
            } catch (e) {
                dispatch('message', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
                throw new Error(e)
            }
        },
        async registr({commit, dispatch}, payload) {
            try {
                const {data} = await axios.post(REGISTR_URL, { ...payload, returnSecureToken: true })
                commit('setToken', data.idToken)
                commit('clearMessage', null, {root: true})
            } catch (e) {
                dispatch('message', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
                throw new Error(e)
            }
        }
    },
    getters: {
        token(state) {
            return state.token
        },
        isAuthenticated(_, getters) {
            return !!getters.token
        }
    }
}