<template>
    <div class="container">
        <Search v-model:searchText="searchText" v-model:isSearchByTitles="isSearchByTitles"
            v-model:isSearchByContent="isSearchByContent" />

        <div class="notes-container">
            <Note v-for="note in notes"
                :content="note.content"
                :title="note.title"
                :date="note.date"
                :idx="note.id"
                :key="note.id" />
        </div>
    </div>
</template>

<script>
import Search from '@/components/UI/Search.vue'
import Note from '@/components/UI/Note.vue'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
    components: { Search, Note },
    setup() {
        const store = useStore()
        const searchText = ref('')
        const isSearchByTitles = ref(true)
        const isSearchByContent = ref(false)
        const notes = store.getters['note/notes']

        // onMounted(async () => {
        //     // флаг - идёт загрузка данных из БД
        //     loading.value = true
        //     // выполнения action 'load', который делает запрос на получение заявок из БД
        //     // и последующее сохранение данных в state
        //     await store.dispatch('request/load')
        //     // загрузка данных завершена
        //     loading.value = false
        // })

        return {
            searchText,
            isSearchByTitles,
            isSearchByContent,
            notes,
        }
    },
}

</script>


<style scoped lang='scss'>
@import '@/styles/homePage.scss';
</style> 