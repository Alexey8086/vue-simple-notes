<template>
    <Loader v-if="loading" />

    <div class="wrapper">
        <div class="note-content">
            <editor-js :note="toRaw(note)" :isNewNote="false"/>
        </div>
    </div>
</template>

<script lang="js">
import { ref, watch, onMounted, onUpdated, toRaw, markRaw } from 'vue'
import Loader from '@/components/UI/Loader'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import EditorJs from '@/components/UI/Editor.vue'


export default {
    components: { EditorJs, Loader },
    props: [],
    emits: [''],

    setup() {
        const route = useRoute()
        const id = route.params.id
        const store = useStore()
        const note = ref({})
        const loading = ref(false)
 
        // console.log(`route.params ${route.params.id}`)

        onMounted(async () => {
            loading.value = true
            await store.dispatch('note/loadOne', id)
            note.value = store.getters['note/currentNote']
            loading.value = false
        })


        return {
            note,
            loading,
            toRaw,
        }
    }
}

</script>

<style scoped lang='scss'>
@import '@/styles/notePage.scss';
</style> 