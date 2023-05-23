import axios from "@/axios/request"
import store from '@/store/index'

export default {
    namespaced: true,
    state() {
        

        return {
            notes: [],
            currentNote: {empty: true}
        }
    },
    mutations: {
        setNotes(state, notes) {
            state.notes = notes
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
                // 'time' явл нативным свойством библиотеки editor.js
                // и используется как id
                item.id !== id
            })
            // мутируем состояние
            state.notes = updatedArray
        },
        setUpdatedOne(state, note) {
            const updatedArray = state.notes.map((item) => {
                if (item.id === note.id) {
                    return { ...note.values }
                }
                return item
            })
            state.notes = updatedArray
        }
    },
    actions: {
        // Создаёт новую заметку, сохраняет её в БД и добавляет её в store
        async create({ commit, dispatch }, payload) {
            try {
                const token = store.getters['auth/token']
                const {data} = await axios.post(`/notes.json?auth=${token}`, payload)
                dispatch('message', {
                    value: 'Заметка успешно создана!',
                    type: 'success'
                }, {root: true})
                commit('setOneNote', {...payload, id: data.name})
            } catch (error) {
                dispatch('message', {
                    value: error.message,
                    type: 'danger'
                }, {root: true})
            }
        },

        // Загружаёт все заявки из БД и сохраняет их в state
        async load({ commit, dispatch }) {
            try {
                const uid = store.getters['auth/uid']
                const token = store.getters['auth/token']
                // const { data } = await axios.get(`/notes.json?auth=${token}`)
                const { data } = await axios.get(`notes.json?auth=${token}&orderBy="uid"&equalTo="${uid}"`)
                ///notes.json?auth=${token}&orderBy="uid"&equalTo="${userId}"
                const notes = data ? Object.keys(data).map(id => ({ ...data[id], id })) : null
                commit('setNotes', notes)
            } catch (e) {
                dispatch('message', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },

        // Загружает одну заметку из БД по её id и возвращаёт её
        async loadOne({ commit, dispatch }, id) {
            try {
                const uid = store.getters['auth/uid']
                const token = store.getters['auth/token']
                const { data } = await axios.get(`/notes/${id}.json?auth=${token}&uid=${uid}`)
                // if (data?.uid !== uid) 
                commit('setCurrentNote', data)
                return data
            } catch (e) {
                dispatch('message', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
    
        // Удаляем одну заметку из БД
        async deleteOne({ commit, dispatch }, id) {
            try {
                const token = store.getters['auth/token']
                // удаляем заявку из БД по её id
                await axios.delete(`/notes/${id}.json?auth=${token}`)
                // обновляем state с заявками (удаляя из него одну заявку по её id)
                commit('setRemoveOne', id)
                // добавляем сообщение (показывая успешное завершение действия)
                dispatch('message', {
                    value: 'Заявка удалена',
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
        async updateOne({ commit, dispatch }, note) {
            try {
                const token = store.getters['auth/token']
                // обновляем данные заявки из БД по её id
                await axios.put(`/notes/${note.id}.json?auth=${token}&orderBy="uid"&equalTo="${uid}"`, note.values)
                // обновляем state с заявками (удаляя из него одну заявку по её id)
                commit('setUpdatedOne', note)
                // добавляем сообщение (показывая успешное завершение действия)
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
        }
    }
}