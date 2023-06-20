<template>
    <!-- 
        Динамические компонеты, конкатенация строк
        (на выходе получаем в параметре is полное название ранее созданного лэйаута).
        Подгружаем тот лэйаут, который указан в роутере
    -->
    <component v-if="layout" :is="layout + '-layout'" />
</template>
  
<script>
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'
import SidebarLayout from '@/layouts/SidebarLayout.vue'


export default {
    components: { MainLayout, SidebarLayout },
    setup() {

        const route = useRoute()
        const layout = computed(() => route.meta.layout)

        return {
            layout
        }
    },


}
</script>

<style lang='scss'>
@import '@/styles/libs/reset.scss';
</style> 
  