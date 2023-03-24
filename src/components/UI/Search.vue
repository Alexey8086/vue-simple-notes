<template>
    <input
        @input="$emit('update:searchText', $event.target.value)"
        :value="searchText"
        id="search"
        type="text"
        placeholder="Введите текст для поиска..."
    />

    <div class="search-filter">
        <button @click="() => isSearchByTitles = !isSearchByTitles" ref="titleTogglerBtn" class="cheked title-toggler">
            <span ref="titleTogglerCircle" class="cheked title-toggler__circle"></span>
        </button>
        <span>поиск по заголовкам</span>
    </div>

    <div class="search-filter">
        <button @click="() => isSearchByContent = !isSearchByContent" ref="contentTogglerBtn" class="content-toggler">
            <span ref="contentTogglerCircle" class="content-toggler__circle"></span>
        </button>
        <span>поиск по содержимому</span>
    </div>
</template>
 
<script>
import { ref, watch } from 'vue'


export default {
    components: {},
    props: ['searchText', 'isSearchByTitles', 'isSearchByContent'],
    emits: ['update:searchText'],
    setup(props, { emit }) {

        const isSearchByTitles = ref(true)
        const isSearchByContent = ref(false)

        const titleTogglerBtn = ref(null)
        const titleTogglerCircle = ref(null)
        const contentTogglerBtn = ref(null)
        const contentTogglerCircle = ref(null)

        // отслеживаем значения чекбоксов
        watch([isSearchByTitles, isSearchByContent], ([newValue1, newValue2], [oldValue1, oldValue2]) => {
            emit('update:isSearchByTitles', newValue1)
            emit('update:isSearchByContent', newValue2)
            if (newValue1) {
                titleTogglerBtn.value.classList.add('cheked')
                titleTogglerCircle.value.classList.add('cheked')
            } else {
                titleTogglerBtn.value.classList.remove('cheked')
                titleTogglerCircle.value.classList.remove('cheked')
            }

            if (newValue2) {
                contentTogglerBtn.value.classList.add('cheked')
                contentTogglerCircle.value.classList.add('cheked')
            } else {
                contentTogglerBtn.value.classList.remove('cheked')
                contentTogglerCircle.value.classList.remove('cheked')
            }
        })



        return {
            isSearchByTitles,
            isSearchByContent,
            titleTogglerBtn,
            titleTogglerCircle,
            contentTogglerBtn,
            contentTogglerCircle,
        }
    },

}

</script>
 
 
<style scoped lang='scss'>
@use '@/styles/libs/fonts.scss';
@import '@/styles/libs/variables.scss';

#search {
    width: 100%;
    height: 28px;
    box-shadow: inset -2px 3px 6px 2px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    font-size: 12px;
    @include fonts.regular;
    color: $secondary-text;
    padding-left: 19px;
}

.search-filter {
    width: 100%;
    margin-top: 18px;
    display: flex;
    margin-bottom: 20px;

    button {
        width: 35px;
        height: 15px;
        background: $white;
        box-shadow: inset -2px 3px 10px rgba(0, 0, 0, 0.25);
        border-radius: 25px;
        display: flex;
        align-items: center;

        span {
            display: block;
            width: 13px;
            height: 12px;
            background-color: $pure-white;
            border-radius: 25px;
            margin: 0;
            margin-left: 1px;
            transition: all 0.3s ease-in-out;
        }

        span.cheked {
            margin-left: 21px;
        }

        &.cheked {
            background: $primary;
        }
    }

    span {
        @include fonts.regular;
        font-size: 10px;
        color: $secondary-text;
        margin-left: 8px;
    }

}
</style> 