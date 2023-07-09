import { $authHost, $host, $authHostMultipart } from "@/axios/index"
import jwt_decode from "jwt-decode"
import store from '@/store/index'
// кастомная обработка ошибок
import { error } from '@/utils/error'
const TOKEN_KEY = 'jwt-token'


export default {
    namespaced: true,
    state() {
        return {
            user: '',
            token: localStorage.getItem(TOKEN_KEY),
            uid: localStorage.getItem("uid"),
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setToken(state, token) {
            state.token = token
            localStorage.setItem(TOKEN_KEY, token)
        },
        setLogout(state) {
            state.token = null
            state.uid = null
            localStorage.removeItem(TOKEN_KEY)
            localStorage.removeItem("uid")
        },
        setUid(state, uid) {
            state.uid = uid
            localStorage.setItem("uid", uid)
        }
    },
    actions: {
        async login({commit, dispatch}, payload) {
            try {
                const body = {
                    email: payload.email,
                    password: payload.password
                }

                const { data } = await $host.post(process.env.VUE_APP_SIGNIN_URL, body)
                const user = jwt_decode(data.token)
                commit('setUid', user.id)
                commit('setToken', data.token)
                commit('setClearMessage', null, {root: true})
                return true
            } catch (e) {
                dispatch('message', {
                    value: e.response.data.message,
                    type: 'danger'
                }, {root: true})
                return false
            }
        },
        
        async registr({commit, dispatch}, payload) {
            try {
                const body = {
                    email: payload.email,
                    name: payload.username,
                    password: payload.password,
                }

                const { data } = await $host.post(process.env.VUE_APP_SIGNUP_URL, body)
                const user = jwt_decode(data.token)
                commit('setUid', user.id)
                commit('setToken', data.token)
                commit('setClearMessage', null, {root: true})
                return true
            } catch (e) {
                dispatch('message', {
                    value: e.response.data.message,
                    type: 'danger'
                }, {root: true})
                return false
            }
        },

        async updateProfile({commit, dispatch}, payload) {
            try {
                console.log("Log from auth module ----- |||| ", payload)
                const body = {
                    name: payload.username,
                    email: payload.email,
                    password: payload.password,
                    file: payload.file,
                    uid: store.getters['auth/uid']
                }
                const { data } = await $authHostMultipart.post(process.env.VUE_APP_USER_UPDATE_URL, body)
                const { id } = jwt_decode(data.token)
                commit('setUid', id)
                commit('setToken', data.token)
                commit('setClearMessage', null, {root: true})
                dispatch('message', {
                    value: data.message,
                    type: 'success'
                }, {root: true})
            } catch (e) {
                dispatch('message', {
                    value: error(e.response.data.message),
                    type: 'danger'
                }, {root: true})
            }
        },

        async getUser({commit, dispatch}, _) {
            try {
                const uid = store.getters['auth/uid']
                const res = await $authHost.post(process.env.VUE_APP_GET_USER_URL, {id: uid})
                if (res.data) commit('setUser', res.data.user)
            } catch (e) {
                throw new Error(e)
            }
        },
    },
    getters: {
        user(state) {
            return state.user
        },
        uid(state) {
            return state.uid
        },
        token(state) {
            return state.token
        },
        isAuthenticated(state, getters) {
            return state.token
        }
    }
}