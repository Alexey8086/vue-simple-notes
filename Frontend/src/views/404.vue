<template>
    <span class="substrate">
        404
    </span>

    <div class="container">
        <span>Ой, похоже вы забрели не туда ...</span>

        <router-link to="/home">
            <button class="go-home">вернуться домой</button>
        </router-link>
    </div>
</template>

<script>
export default {
    name: '',
    components: {},
    props: [''],
    emits: [''],

    setup() {



        return {

        }
    }
}

</script>

<style scoped lang='scss'>
@import '@/styles/404.scss';
</style> 