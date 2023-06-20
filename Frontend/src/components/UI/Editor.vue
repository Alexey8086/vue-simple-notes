<template>
    <div id="editorjs" ref="editorRef"></div>

    <bottom-menu
        @deleteNote="deleteNote"
        @cancelNote="cancelNote"
        @editNote="editNote"
        @save-note="saveData"
    />
    
</template>

<script>

import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/nested-list'
import Paragraph from '@editorjs/paragraph'
import bottomMenu from '@/components/UI/bottomMenu'


export default {
    name: 'EditorJs',
    components: { bottomMenu },
    props: {
        note: {
            type: Object,
            require: false
        },
        isNewNote: {
            type: Boolean,
            require: true
        }
    },
    emits: ['getEditorInstance'],

    setup(props, { emit }) {

        const router = useRouter()
        const route = useRoute()
        const store = useStore()
        const uid = store.getters['auth/uid']
        const idx = route.params.id
        let editorInstance
        // const noteData = computed(() => toRaw(props.note.value))
        const editorRef = ref(null)
        const config = {
            autofocus: true,
            // если это новая заметка, то мы отключаем readOnly мод
            readOnly: props.isNewNote ? false : true,
            placeholder: 'Напишите о вашем космически важном, мы никому не расскажем...',
            tools: {
                header: {
                    class: Header,
                    inlineToolbar: true,
                    config: {
                        placeholder: 'Введите заголовок',
                        levels: [2, 3, 4],
                        defaultLevel: 3
                    }
                },
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true,
                    confirm: {
                        placeholder: 'something to write.....'
                    }
                },
                list: {
                    class: List,
                    inlineToolbar: true,
                    config: {
                        defaultStyle: 'unordered'
                    },
                },
            },
            blocks: ['header', 'list', 'quote'],
        }

        const saveData = async () => {
            try {
                if (props.isNewNote) {
                    const data = await editorInstance?.save()
                    await store.dispatch('note/create', {...data, uid: uid})
                    console.log("NEW NOTE CREATED")
                    router.push('/home')
                } else {
                    const data = await editorInstance?.save()
                    await store.dispatch('note/updateOne', { id: idx, uid: uid, ...data })
                    router.push('/home')
                }

            } catch (e) {
                customLog('Saving editor data error: ', e)
            }
        }

        // выключаем 'readOnly' мод в редакторе при нажатии на кнопку 'редактировать'
        const editNote = () => {
            editorInstance.readOnly.toggle()
        }
        // включаем 'readOnly' мод в редакторе при нажатии на кнопку 'отмена'
        const cancelNote = () => {
            editorInstance.readOnly.toggle()
        }

        const deleteNote = async () => {
            try {
                await store.dispatch('note/deleteOne', idx)
                router.push('/home')
            } catch (e) {
                customLog('Saving editor data error: ', e)
            }
        }

        onMounted(async () => {
            try {
                let data = null
                if (!props.isNewNote) {
                    data = await store.dispatch('note/loadOne', idx)
                }

                editorInstance = new EditorJS({
                    holder: editorRef.value,
                    ...config,
                    data: {
                        ...data
                    },


                    // onReady: () => {
                    //     console.log('Editor.js is ready to work!')
                    // }

                    // onChange: (api, event) => {
                    //     console.log('Now I know that Editor\'s content changed!', event)
                    // }
                })

                await editorInstance.isReady
                emit('getEditorInstance', editorInstance)
            } catch (error) {
                customLog(`Editor.js initialization failed because of ${reason}`)
            }

        })

        onBeforeUnmount(() => {
            editorInstance.destroy()
        })

        return {
            saveData,
            editNote,
            cancelNote,
            deleteNote,

            editorRef,
        }
    }
}

</script>

<style lang='scss'>
@media (max-width: 650px) {
    .ce-popover {
        bottom: 45px !important;
    }
}
</style> 