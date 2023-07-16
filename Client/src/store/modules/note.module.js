import { $authHost } from "@/axios/index"
import store from '@/store/index'
import { reactive } from 'vue'

export default {
    namespaced: true,
    state() {
        
        return {
            notes: [],
            currentNote: {empty: true},
            thereIsNotes: true
        }
    },
    mutations: {
        setAnewNotes(state, notes) {
            state.notes = notes
        },
        setNotes(state, notes) {
            state.notes = [...state.notes, ...notes]
        },
        setOneNote(state, note) {
            state.notes.push(note)
        },
        // добаляет в state заметку, которая была запрошена из БД по id для ее открытия
        setCurrentNote(state, note) {
            state.currentNote = note
        },
        // удаляет одну заметку из массива по её id
        setRemoveOne(state, id) {
            const updatedArray = state.notes.filter((item) => {
                item.id !== id
            })

            state.notes = updatedArray
        },
        setUpdatedOne(state, note) {
            const updatedArray = state.notes.map((item) => {

                if (item.id === note.id) {
                    return reactive(note)
                }
                return item
            })
            state.notes = updatedArray
        },
        setThereIsNotes(state, thereIsNotes) {
            state.thereIsNotes = thereIsNotes
        },
        setEmptyState (state) {
            state.notes = []
            state.currentNote = {empty: true},
            state.thereIsNotes = false
        }
    },
    actions: {
        // Создаёт новую заметку, сохраняет её в БД и добавляет её в store
        async create({ commit, dispatch }, payload) {
            try {
                const { data } = await $authHost.post('notes/create', payload)

                // commit('setOneNote', {...payload, id: data.id})
                commit('setClearMessage', null, {root: true})

                dispatch('message', {
                    value: "Заметка успешно создана!",
                    type: 'success'
                }, {root: true})
            } catch (e) {
                dispatch('message', {
                    value: error(e.response.data.message),
                    type: 'danger'
                }, {root: true})
            }
        },

        // Загружаёт все заявки из БД и сохраняет их в state
        async load({ commit, dispatch }) {
            try {
                const uid = store.getters['auth/uid']
                const res = await $authHost.get('notes/all', {id: uid})
                // в случае отсутствия поля data в ответе исключаем лишние ошибки
                if(res.data) commit('setNotes', res.data)
            } catch (e) {
                console.log(e);
                dispatch('message', {
                    value: e.response.data.message,
                    type: 'danger'
                }, {root: true})
            }
        },

        async loadMore({ commit, dispatch }, payload) {
            try {
                const res = await $authHost.post('notes/more', payload)
                if (res.data) {
                    console.log("res.data?.length", res.data.length)
                    if (res.data?.length) {
                        commit('setNotes', res.data)
                        commit('setThereIsNotes', true)
                    }  else commit('setThereIsNotes', false)
                }
            } catch (e) {
                dispatch('message', {
                    value: e.response.data.message,
                    type: 'danger'
                }, {root: true})
            }
        },

        async search({ commit, dispatch }, payload) {
            try {
                const res = await $authHost.post('notes/search', payload)
                if(res.data) commit('setAnewNotes', res.data)
            } catch (e) {
                dispatch('message', {
                    value: error(e.response.data.message),
                    type: 'danger'
                }, {root: true})
            }
        },

        // Загружает одну заметку из БД по её id и возвращаёт её
        async loadOne({ commit, dispatch }, id) {
            try {
                const res = await $authHost.get(`notes/${id}?id=${id}`)
                if (res.data) {
                    commit('setCurrentNote', res.data)
                    return res.data
                }
            } catch (e) {
                dispatch('message', {
                    value: error(e.response.data.message),
                    type: 'danger'
                }, {root: true})
            }
        },
    
        // Удаляем одну заметку из БД
        async deleteOne({ commit, dispatch }, id) {
            try {
                await $authHost.get(`notes/delete?id=${id}`)
                commit('setRemoveOne', id)

                dispatch('message', {
                    value: 'Заметка удалена',
                    type: 'success'
                }, {root: true})
            } catch (error) {
                dispatch('message', {
                    value: error.message,
                    type: 'danger'
                }, {root: true})
            }
        },
    
        // Изменяем одну заметку из БД
        async updateOne({ commit, dispatch }, payload) {
            try {
                await $authHost.post('notes/update', payload)
                commit('setUpdatedOne', payload)

                dispatch('message', {
                    value: 'Заявка обновлена',
                    type: 'success'
                }, {root: true})
            } catch (e) {
                dispatch('message', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        }
    },
    getters: {
        notes(state) {
            return state.notes
        },
        currentNote(state) {
            return state.currentNote
        },
        thereIsNotes(state) {
            return state.thereIsNotes
        }
    }
}