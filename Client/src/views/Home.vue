<template>
    <Loader v-if="loading" />

    <div class="container">
        <Search v-model:searchText="searchText" v-model:isSearchByTitles="isSearchByTitles"
            v-model:isSearchByContent="isSearchByContent" />

        <transition-group class="notes-container" name="notesList" tag="div">
            <Note v-if="notes.value" v-for="note in notes.value" :content="note.content" :title="note.title"
                :date="note.date" :idx="note.id" :key="note.id" />
            <div v-else-if="searchText">Совпадений не найдено</div>
            <div v-else>Упс, похоже здесь пусто, создайте что-нибудь восхитительное</div>
        </transition-group>

        <div ref="observer" class="observer"></div>
    </div>
</template>

<script>
import Search from '@/components/UI/Search.vue'
import Note from '@/components/UI/Note.vue'
import Loader from '@/components/UI/Loader.vue'
import { normalizeData } from '@/utils/normilizeData'
import { ref, computed, watch, onMounted, toRaw, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
    components: { Search, Note, Loader },
    setup() {
        const store = useStore()
        const isSearching = ref(false)
        const searchText = ref('')
        const isSearchByTitles = ref(true)
        const isSearchByContent = ref(false)
        const loading = ref(false)
        const loaderColor = 'green'
        const loaderSize = 50
        const observer = ref(null)
        const notes = reactive({ value: null })
        const options = reactive({
            trackVisibility: true,
            delay: 100
        })
        // let thereIsNotes = ref(null)
        const thereIsNotes = reactive({ value: null })
        let observerInst = null

        // порционная загрузка новых заметок с сервера
        const loadMoreNotes = async () => {
            try {
                loading.value = true
                await store.dispatch('note/loadMore', { notes: store.state.note.notes, limit: 10 })
                loading.value = false
            } catch (e) {
                throw new Error(e)
            }
        }

        // callback функция, которая отрабатывает при пересечении обзервера
        const handleIntersection = (entries) => {
            const target = entries[0]
            // загружаем порцию заметок при пересечении обзервера и если не выполняется поиск
            if (target.isIntersecting && !isSearching.value) {
                loadMoreNotes()
            }
        }

        // изменение свойства обзервера isVisible
        const toggleTrackVisibility = (isTrackingEnable) => {
            options.trackVisibility = isTrackingEnable

            observerInst.disconnect()
            observerInst = new IntersectionObserver(handleIntersection, toRaw(options))
            observerInst.observe(observer.value)
        }


        onMounted(() => {
            if (observer.value) {
                observerInst = new IntersectionObserver(handleIntersection, toRaw(options))
                observerInst.observe(observer.value)
            }
        })

        // отслеживаем состояние поисковой строки
        watch(
            [searchText, isSearchByTitles, isSearchByContent],
            async ([newSearchText, newIsSearchByTitles, newIsSearchByContent],
                [oldSearchText, oldIsSearchByTitles, oldIsSearchByContent]) => {

                // если в строке поиска присутствует текст, то isSearching явл истиной
                if (newSearchText) isSearching.value = true
                else isSearching.value = false

                const payload = {
                    searchingValue: newSearchText,
                    searchByHeading: newIsSearchByTitles,
                    searchByContent: newIsSearchByContent,
                }

                await store.dispatch('note/search', payload)
            }
        )

        notes.value = computed(() => {
            // store.getters не будет явл., прямой зависимостью
            // и поэтому computed не будет реагировать на изменения стейта
            // при использовании геттеров из-за чего мы используем стейт на прямую
            return normalizeData(toRaw(store.state.note.notes))

        })

        // отслеживаем наличие заметок в бд, которые ещё не отображены на клиенте
        thereIsNotes.value = computed(() => { return store.state.note.thereIsNotes})


        return {
            searchText,
            isSearchByTitles,
            isSearchByContent,
            notes,
            loading,
            loaderColor,
            loaderSize,
            observer,
            thereIsNotes,

            loadMoreNotes
        }
    },
}

</script>


<style scoped lang='scss'>
@import '@/styles/homePage.scss';

.notesList-enter-active,
.notesList-leave-active {
    transition: all 0.5s ease;
}

.notesList-enter-from,
.notesList-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.notesList-move {
    transition: transform 0.45s ease;
}

.observer {
    height: 30px;
    background-color: #579cef;
    width: 100%;
}
</style> 