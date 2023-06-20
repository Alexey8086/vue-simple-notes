<template>
    <div class="container">
        <h1 class="cover-title">
            Записывайте ваше космически важное вместе с
            <span class="company-title">Simple Notes</span>
        </h1>

        <button @click="pushUrl('/signup')" class="btn-sign-up btn-primary">зарегистрироваться</button>
        <button @click="pushUrl('/signin')" class="btn-sign-in btn-primary">войти</button>
    </div>
</template>

<script>
import navigate from '@/use/navigate.js'

export default {
    components: {},
    setup() {


        return {
            pushUrl: navigate().pushUrl
        }
    },
}

</script>


<style scoped lang='scss'>
    @import '@/styles/mainPage.scss';
</style> 