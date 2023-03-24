<template>

    <div class="container">
        <Search
            v-model:searchText="searchText"
            v-model:isSearchByTitles="isSearchByTitles"
            v-model:isSearchByContent="isSearchByContent"
        />

        <div class="notes-container">
            <Note 
                v-for="note in arr"
                :content="note.content"
                :title="note.title"
                :date="note.date"
                :key="note.id"
            />
        </div>
    </div>
</template>

<script>
import Search from '@/components/UI/Search.vue'
import Note from '@/components/UI/Note.vue'

import { ref } from 'vue'

export default {
    components: { Search, Note },
    setup() {

        const searchText = ref('')
        const isSearchByTitles = ref(true)
        const isSearchByContent = ref(false)

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

        const arr = [
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


        return {
            searchText,
            isSearchByTitles,
            isSearchByContent,
            arr,
        }
    },
}

</script>


<style scoped lang='scss'>
@import '@/styles/homePage.scss';
</style> 