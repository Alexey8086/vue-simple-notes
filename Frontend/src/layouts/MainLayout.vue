<template>
    <!-- Vue 3 не требует родительской обертки (можно без Fragment компонета) -->
    <message />
    <router-view />
</template>

<script>
import Message from '@/components/UI/Message.vue'

export default {
    components: { Message },
}

</script>

<style lang='scss'>
body {
    overflow-x: hidden;
}
</style> 