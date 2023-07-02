<template>
    <!-- 
        Динамические компонеты, конкатенация строк
        (на выходе получаем в параметре "is" полное название ранее созданного лэйаута).
        Подгружаем тот лэйаут, который указан в роутере
    -->
        <component v-if="layout" :is="layout + '-layout'" />

</template>
  
<script>
import { useRoute } from 'vue-router'
import { ref, computed, onMounted, watch} from 'vue'
import { useStore } from 'vuex'
import MainLayout from '@/layouts/MainLayout.vue'
import SidebarLayout from '@/layouts/SidebarLayout.vue'


export default {
    components: { MainLayout, SidebarLayout },
    setup() {
        const route = useRoute()
        const layout = computed(() => route.meta.layout)
        const store = useStore()
        // отслеживаем изменения в стейте
        document.documentElement.dataset.theme = store.state.theme
        const theme = computed(() => store.state.theme)
        
        // т.к. computed возвращает proxy объект, мы не можем сразу
        // занести новое значение в dataset. Поэтому используем watch,
        // который следит за theme и при изменении вносит новое занчение в dataset
        watch(theme, (newValue, oldValue) => {
            document.documentElement.dataset.theme = newValue
        })



        return {
            layout,
            theme
        }
    },


}
</script>

<style lang='scss'>
    @import '@/styles/libs/reset.scss';
    @import '@/styles/index.scss';

    body {
        background-color: var(--smoke-white)!important;
    }
</style> 
  