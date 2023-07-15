<template>

    <Message />

    <div class="menu">
        <MenuIcon
            @click="() => sidebarIsOpen = true"
            class="sidebar-open-btn"
            width="35px"
            height="35px"
            :color="iconColor"
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

    <Sidebar :user="user" :imageUrl="imageUrl" :altText="altText" v-model:sidebarIsOpen="sidebarIsOpen" ref="sidebar" />

    <router-view />
</template>

<script>
import { ref, onMounted, computed, reactive } from 'vue'
import Sidebar from '@/components/UI/Sidebar'
import MenuIcon from '@/components/icons/MenuIcon.vue'
import Message from '@/components/UI/Message.vue'
import { useStore } from 'vuex'
import { retrieveImage } from '@/utils/retrieveImage.js'



export default {
    components: { MenuIcon, Sidebar, Message },
    setup() {
        const sidebarIsOpen = ref(false)
        const store = useStore()
        const iconColor = computed(() => (store.state.theme == 'dark') ? '#C0BFBF' : '#1D1D1D')
        const loading = ref(false)
        const user = ref(null)
        const imageUrl = reactive({value: ''})
        const altText = ref('Uploaded Image')

        

        onMounted(async () => {
            loading.value = true


            await store.dispatch('auth/getUser')
            user.value = store.getters['auth/user']
            const uploadedImage = await retrieveImage(user.value.userImg.data)
            imageUrl.value = uploadedImage.imageUrl
            altText.value = uploadedImage.altText

            loading.value = false
        })



        return {
            user,
            loading,
            sidebarIsOpen,
            MenuIcon,
            Sidebar,
            iconColor,

            imageUrl,
            altText,
        }
    },
}

</script>

<style scoped lang='scss'>
@import '@/styles/sidebarLayout.scss';
</style> 