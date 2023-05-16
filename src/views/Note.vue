<template>
    <div class="wrapper">
        <div class="note-content">
            <editor-js v-model="data" />
        </div>
    </div>
</template>

<script lang="js">
import { ref, watch, onMounted, onUpdated } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import EditorJs from '@/components/UI/Editor.vue'


export default {
    components: { EditorJs },
    props: [''],
    emits: [''],

    setup() {
        const route = useRoute()
        const idx = route.params.id
        const store = useStore()
        const data = store.getters['note/notes'][idx]
 
        console.log(`route.params ${route.params.id}`)
        console.log("Data", data);

        watch(data, async (newValue, prevValue) => {
            await store.dispatch('note/create', newValue)
        })


        return {
            data
        }
    }
}

</script>

<style scoped lang='scss'>
@import '@/styles/notePage.scss';
</style> 