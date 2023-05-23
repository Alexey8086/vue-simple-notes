<template>

    <Message />

    <div class="menu">
        <MenuIcon
            @click="() => sidebarIsOpen = true"
            class="sidebar-open-btn"
            width="35px"
            height="35px"
            color="#000000"
        />
    </div>


        <!--  Изменяя при событии onClik модель 'sidebarIsOpen' на true
          мы даём понять компоненту Sidebar, что его props изменился
          и пора сделать update компоненета.
          В свою очередь, внутри компонента мы реагируем на изменение
          props (а они у нас реактивные т.к. 'sidebarIsOpen' это ref).
          А именно открываем Sidebar и закрываем. Но в случае закрытия
          делаем emit события update:sidebarIsOpen со значением 'false'
          тем самым синхонизируем данные модели 'sidebarIsOpen' между
          родительским компонентом и дочерним.
    -->

    <Sidebar v-model:sidebarIsOpen="sidebarIsOpen" ref="sidebar" />

    <router-view />
</template>

<script>
import { ref } from 'vue'
import Sidebar from '@/components/UI/Sidebar'
import MenuIcon from '@/components/icons/MenuIcon.vue'
import Message from '@/components/UI/Message.vue'

export default {
    components: { MenuIcon, Sidebar, Message },
    setup() {
        const sidebarIsOpen = ref(false)

        const check = () => {
            console.log('check!')
        }


        return {
            check,

            sidebarIsOpen,
            MenuIcon,
            Sidebar,
        }
    },
}

</script>

<style scoped lang='scss'>
@import '@/styles/sidebarLayout.scss';
</style> 