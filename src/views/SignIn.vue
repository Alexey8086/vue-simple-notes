<template>
    <div class="auth sign-in">
        <span>Авторизация</span>
        <span>а мы вас ждали!</span>

        <form action="" method="post" @submit.prevent="onSubmit">
            <div class="form-group">
                <label for="email">E-mail:</label>
                <input
                    v-model="email"
                    @blur="emailBlur"
                    :class="['', {invalid: emailError}, {valid: emailMeta.dirty && !emailError}]"
                    id="email"
                    placeholder="введите свой email"
                    autocomplete="on"
                >
                <p v-if="emailError">{{ emailError }}</p>
            </div>
            <div class="form-group">
                <label for="password">Пароль:</label>
                <input
                    v-model="password"
                    @blur="passwordBlur"
                    :class="['', {invalid: passwordError}, {valid: passwordMeta.dirty && !passwordError}]"
                    type="password"
                    id="password"
                    placeholder="введите пароль"
                    autocomplete="on"
                >
                <p v-if="passwordError">{{ passwordError }}</p>
            </div>

            <button :disabled="isSubmitting || isTooManyAttempts" type="submit" class="btn-primary">войти</button>
            <p v-if="isTooManyAttempts" class="invalid-colorOnly">Вы слишком часто пытались войти, подождите минуточку ...</p>
        </form>
        <router-link class="have-account-link" to="/signup">нет аккаунта?</router-link>
    </div>
</template>

<script lang="js">
import { useLoginForm } from '@/use/useLoginForm'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { error } from '@/utils/error'


export default {
    components: {},
    setup() {
        const route = useRoute()
        const store = useStore()

        if (route.query.message) {
            store.dispatch('message', {
                value: error(route.query.message),
                type: 'warning'
            })
        }
        customLog(route.query)

        return {
            ...useLoginForm()
        }
    },
}

</script>


<style scoped lang='scss'>
@import '@/styles/authPage.scss';
</style> 