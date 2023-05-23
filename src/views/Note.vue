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
        const idx = route.params.id
        const store = useStore()
        const note = ref({})
        const loading = ref(false)
 
        // console.log(`route.params ${route.params.id}`)

        onMounted(async () => {
            loading.value = true
            note.value = await store.dispatch('note/loadOne', idx)
            loading.value = false
            // customLog(note)
        })


        // watch(note, async (newValue, prevValue) => {
        //     await store.dispatch('note/create', newValue)
        // })


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