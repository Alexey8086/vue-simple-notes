// import axios from "@/axios/request"
import store from '@/store/index'

export default {
    namespaced: true,
    state() {
        const date_obj = new Date()
        const dateTime =
            ("0" + date_obj.getDate()).slice(-2)
            + "."
            + ("0" + (date_obj.getMonth() + 1)).slice(-2)
            + "."
            + date_obj.getFullYear()
            + ", "
            + ("0" + date_obj.getHours()).slice(-2)
            + ":"
            + ("0" + date_obj.getMinutes()).slice(-2)

        return {
            notes: [
                {
                    content: 'sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem',
                    title: 'Sed ut perspiciatis unde',
                    date: dateTime,
                    id: 0
                },
                {
                    content: 'sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem',
                    title: 'him some great pleasure',
                    date: dateTime,
                    id: 1
                },
                {
                    content: 'sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem',
                    title: 'itself, because it is pain',
                    date: dateTime,
                    id: 2
                },
                {
                    content: 'sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem',
                    title: 'denouncing pleasure and praising',
                    date: dateTime,
                    id: 3
                }
            ]
        }
    },
    mutations: {
        setNotes(state, notes) {
            state.notes = notes
        },
        setOneNote(state, note) {
            state.notes.push(note)
        },
        // удаляет одну заметку из массива по её id
        setRemoveOne(state, id) {
            const updatedArray = state.notes.filter((item) => {
                // 'time' явл нативным свойством библиотеки editor.js
                // и используется как id
                item.id !== id
            })
            state.notes = updatedArray
        },
        setEditOne(state, note) {
            const updatedArray = state.notes.map((item) => {
                if (item.id === note.id) {
                    return { ...note }
                }
                return item
            })
            state.notes = updatedArray
        }
    },
    actions: {
                // Создаёт новую заметку, сохраняет её в БД и добавляет её в store
                async create({ commit, dispatch }, payload) {
                    commit('setOneNote', payload)
                },
                // Загружаёт все заявки из БД и сохраняет их в state
                async load({ commit, dispatch }) {
                    
                },
                // Загружает одну заметку из БД по её id и возвращаёт её
                async loadOne({ commit, dispatch }, id) {
                    
                },
        
                // Удаляем одну заметку из БД
                async removeOne({ commit, dispatch }, id) {
                    
                },
        
                // Изменяем одну заметку из БД
                async updateOne({ commit, dispatch }, request) {
                    
                }
    },
    getters: {
        notes(state) {
            return state.notes
        }
    }
}