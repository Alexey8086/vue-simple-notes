<template>
    <div ref="editorRef"></div>

    <bottom-menu @editNote="editNote()" @save-note="saveData()" />
</template>

<script>

import { ref, onMounted, onBeforeUnmount } from 'vue'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/nested-list'
import Paragraph from '@editorjs/paragraph'
import bottomMenu from '@/components/UI/bottomMenu.vue'


export default {
    name: 'EditorJs',
    components: { bottomMenu },
    props: {
        modelValue: {
            type: Object,
            require: false
        }
    },
    emits: ['getEditorInstance', 'update:modelValue'],

    setup(props, { emit }) {

        let editorInstance
        const editorRef = ref(null)
        const config = {
            autofocus: true,
            readOnly: true,
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
                const data = await editorInstance?.save()
                customLog('Saved data ---> ', data)
                emit('update:modelValue', data)
            } catch (e) {
                customLog('Saving editor data error: ', e)
            }
        }

        // выключаем 'readOnly' мод в редакторе при нажатии на кнопку 'редактировать'
        const editNote = () => {
            editorInstance.readOnly.toggle()
        }

        onMounted(async () => {
            editorInstance = new EditorJS({
                holder: editorRef.value,
                ...config,
                data: {
                    ...props.modelValue
                },

                // onReady: () => {
                //     console.log('Editor.js is ready to work!')
                // }

                // onChange: (api, event) => {
                //     console.log('Now I know that Editor\'s content changed!', event)
                // }
            })

            try {
                await editorInstance.isReady
                emit('getEditorInstance', editorInstance)
                customLog('Editor is ready to work!')
                /** Do anything you need after editor initialization */
            } catch (reason) {
                customLog(`Editor.js initialization failed because of ${reason}`)
            }
        })

        onBeforeUnmount(() => {
            editorInstance.destroy()
        })

        return {
            saveData,
            editNote,
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