import axios from 'node_modules/axios'
import axiosDB from "@/axios/request"
// кастомная обработка ошибок
import { error } from '@/utils/error'
const TOKEN_KEY = 'jwt-token'
const LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_DB_KEY}`
const REGISTR_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_DB_KEY}`
const UPDATE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.VUE_APP_DB_KEY}`


export default {
    namespaced: true,
    state() {
        return {
            token: localStorage.getItem(TOKEN_KEY),
            uid: localStorage.getItem("uid"),
            displayName: localStorage.getItem("displayName"),
            avatarUrl: localStorage.getItem("avatarUrl"),
            userInfoId: localStorage.getItem("userInfoId"),
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            localStorage.setItem(TOKEN_KEY, token)
        },
        setLogout(state) {
            state.token = null
            state.uid = null
            state.displayName = null
            state.avatarUrl = null
            localStorage.removeItem(TOKEN_KEY)
            localStorage.removeItem("uid")
            localStorage.removeItem("displayName")
            localStorage.removeItem("avatarUrl")
            localStorage.removeItem("userInfoId")
        },
        setUid(state, uid) {
            state.uid = uid
            localStorage.setItem("uid", uid)
        },

        setUserInfoId(state, id) {
            state.userInfoId = id
            localStorage.setItem("userInfoId", id)
        },

        setUserInfo(state, payload) {
            state.displayName = payload.displayName
            state.avatarUrl = payload.avatarUrl
            localStorage.setItem("displayName", payload.displayName)
            localStorage.setItem("avatarUrl", payload.avatarUrl)
        }
    },
    actions: {
        async login({commit, dispatch}, payload) {
            try {
                const {data} = await axios.post(LOGIN_URL, {...payload, returnSecureToken: true})
                commit('setUid', data.localId)
                commit('setToken', data.idToken)
                commit('setClearMessage', null, {root: true})
            } catch (e) {
                dispatch('message', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
                console.log(error(e.response.data.error.message))
                throw new Error()
            }
        },

        async registr({commit, dispatch}, payload) {
            try {
                const user = {
                    email: payload.email,
                    password: payload.password
                }

                const {data} = await axios.post(REGISTR_URL, {...user, returnSecureToken: true})

                const userMetaData = {
                    displayName: payload.username,
                    photoUrl: `https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${payload.username}`,
                    uid: data.localId
                }

                commit('setUid', data.localId)
                commit('setToken', data.idToken)

                const res = await axiosDB.post(`/userInfo.json?auth=${data.idToken}`, userMetaData)

                commit('setUserInfoId', res.data.name)

                commit('setClearMessage', null, {root: true})
            } catch (e) {
                dispatch('message', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
                console.log(error(e.response.data.error.message))
                throw new Error()
            }
        },

        async updateProfile({commit, dispatch}, payload) {
            try {
                

                const userMeta = {
                    displayName: payload.username,
                    photoUrl: `https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${payload.username}`
                }

                const user = {
                    displayName: payload.username,
                    email: payload.email,
                    password: payload.email
                }

                const {data} = await axios.post(UPDATE_URL, {...user, returnSecureToken: true})
                commit('setUid', data.localId)
                commit('setToken', data.idToken)
                commit('setClearMessage', null, {root: true})
            } catch (e) {
                dispatch('message', {
                    value: error(e.code),
                    type: 'danger'
                }, {root: true})
                throw new Error(e)
            }
        },

        async loadUserInfo({commit, dispatch}, _) {
            try {
                const uid = store.getters['auth/uid']
                const token = store.getters['auth/token']
                const { data } = await axios.get(`/users.json?auth=${token}&uid=${uid}`)
                commit('setUserInfo', data)
                return data
            } catch (e) {
                dispatch('message', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        }
    },
    getters: {
        uid(state) {
            return state.uid
        },
        token(state) {
            return state.token
        },
        isAuthenticated(_, getters) {
            return !!getters.token
        }
    }
}