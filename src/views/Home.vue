<template>
    <Loader v-if="loading" />

    <div class="container">
        <Search v-model:searchText="searchText" v-model:isSearchByTitles="isSearchByTitles"
            v-model:isSearchByContent="isSearchByContent" />

        <div class="notes-container">
            <Note v-if="notes.value" v-for="note in notes.value" :content="note.content" :title="note.title" :date="note.date" :idx="note.id"
                :key="note.id" />
            <div v-else>Тут пока пусто, начните создавать что-то прекрасное!</div>
        </div>
    </div>
</template>

<script>
import Search from '@/components/UI/Search.vue'
import Note from '@/components/UI/Note.vue'
import Loader from '@/components/UI/Loader.vue'
import { normalizeData } from '@/utils/normilizeData'
import { ref, computed, onMounted, toRaw, reactive, watchEffect } from 'vue'
import { useStore } from 'vuex'

export default {
    components: { Search, Note, Loader },
    setup() {
        const store = useStore()
        const searchText = ref('')
        const isSearchByTitles = ref(true)
        const isSearchByContent = ref(false)
        const loading = ref(false)
        const loaderColor = 'green'
        const loaderSize = 50
        // const notes = ref(null)
        const notes = reactive({value: null})
        // const notes = store.getters['note/notes']

        onMounted(async () => {
            customLog('MOUNTED')
            // флаг - идёт загрузка данных из БД
            loading.value = true
            // выполнения action 'load', который делает запрос на получение заявок из БД
            // и последующее сохранение данных в state
            await store.dispatch('note/load')
            // загрузка данных завершена
            loading.value = false

            notes.value = computed(() => {
                return normalizeData(toRaw(store.getters['note/notes']))
            })

            customLog(notes.value)
        })

        
        return {
            searchText,
            isSearchByTitles,
            isSearchByContent,
            notes,
            loading,
            loaderColor,
            loaderSize,
        }
    },
}

</script>


<style scoped lang='scss'>
@import '@/styles/homePage.scss';
</style> 