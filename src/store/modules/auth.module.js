import axios from 'node_modules/axios'
import {signIn, signUp, updateProfile, getDocument, getDocumentsByUid} from '@/utils/firebase.js'
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
            uid: localStorage.getItem("uid")
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
        },
        setUid(state, uid) {
            state.uid = uid
            localStorage.setItem("uid", uid)
        }
    },
    actions: {
        async login({commit, dispatch}, payload) {
            try {
                const {data} = await axios.post(LOGIN_URL, { ...payload, returnSecureToken: true })
                console.log('PROFILE INFP --->>>  ', data);
                commit('setUid', data.localId)
                commit('setToken', data.idToken)
                commit('setClearMessage', null, {root: true})
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
                const body = {
                    displayName: payload.username,
                    email: payload.email,
                    password: payload.password,
                    photoUrl: ''
                }
                const {data} = await axios.post(REGISTR_URL, {...body, returnSecureToken: true})
                commit('setUid', data.uid)
                commit('setToken', data.accessToken)
                commit('setClearMessage', null, {root: true})
            } catch (e) {
                dispatch('message', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
                throw new Error(e)
            }
        },

        async updateProfile({commit, dispatch}, payload) {
            try {
                const body = {
                    displayName: payload.username,
                    email: payload.email,
                    password: payload.password,
                    photoUrl: ''
                }
                const {data} = await axios.post(UPDATE_URL, { ...body, returnSecureToken: true })
                commit('setUid', data.localId)
                commit('setToken', data.idToken)
                commit('setClearMessage', null, {root: true})
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