<template>
    <div v-if="isSignUp" class="auth sign-up">
        <span>Регистрация</span>
        <span>весь космос внутри вас</span>

        <form action="" method="post">
            <div class="form-group">
                <label for="user-name">Имя:</label>
                <input type="text" id="user-name" placeholder="введите ваше имя" required>
                <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div class="form-group">
                <label for="email">E-mail:</label>
                <input type="email" id="email" placeholder="введите свой email" required>
            </div>
            <div class="form-group">
                <label for="password">Пароль:</label>
                <input type="password" id="password" placeholder="придумайте пароль" required>
            </div>
            <div class="form-group">
                <label for="password-confirm">Подтверждение пароля:</label>
                <input type="password" id="password-confirm" placeholder="введите пароль ещё раз" required>
            </div>

            <button type="submit" class="btn-primary">зарегистрироваться</button>
        </form>
        <router-link class="have-account-link" to="/signin">уже есть аккаунт?</router-link>
    </div>

    <div v-else="isSignUp" class="auth sign-in">
        <span>Авторизация</span>
        <span>а мы вас ждали!</span>

        <form action="" method="post">
            <div class="form-group">
                <label for="email">E-mail:</label>
                <input type="email" id="email" placeholder="введите свой email" required>
            </div>
            <div class="form-group">
                <label for="password">Пароль:</label>
                <input type="password" id="password" placeholder="введите пароль" required>
            </div>

            <button type="submit" class="btn-primary">войти</button>
        </form>
        <router-link class="have-account-link" to="/signup">нет аккаунт?</router-link>
    </div>
</template>

<script lang="js">

import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'

export default {
    components: {},
    setup() {

        const route = useRoute()
        // Т.к. функционал регистр., и входа не декомпозирован на компонеты
        // и находится в данном компоненте 'Auth' то с помощью параметра
        // 'isSignUp' из vue-router происходит разделение
        const isSignUp = computed(() => route.meta.signup)

        return {
            isSignUp
        }
    },
}

</script>


<style scoped lang='scss'>
@import '@/styles/authPage.scss';
</style> 