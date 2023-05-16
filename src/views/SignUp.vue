<template>
    <div class="auth sign-up">
        <span>Регистрация</span>
        <span>весь космос внутри вас</span>

        <form @submit.prevent="onSubmit" action="" method="post">
            <div class="form-group">
                <label for="user-name">Имя:</label>
                <input
                    v-model="username"
                    @blur="usernameBlur"
                    :class="['', {invalid: usernameError}, {valid: usernameMeta.dirty && !usernameError}]"
                    type="text"
                    id="user-name"
                    placeholder="введите ваше имя"
                    autocomplete="on"
                >
                <p v-if="usernameError">{{ usernameError }}</p>
            </div>
            <div class="form-group">
                <label for="email">E-mail:</label>
                <input
                    v-model="email"
                    @blur="emailBlur"
                    :class="['', {invalid: emailError}, {valid: emailMeta.dirty && !emailError}]"
                    type="email"
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
                    placeholder="придумайте пароль"
                    autocomplete="on"
                >
            <p v-if="passwordError">{{ passwordError }}</p>

            </div>
            <div class="form-group">
                <label for="password-confirm">Подтверждение пароля:</label>
                <input
                    v-model="passwordConfirm"
                    @blur="passwordConfirmBlur"
                    :class="['', {invalid: passwordConfirmError}, {valid: passwordConfirmMeta.dirty && !passwordConfirmError}]"
                    type="password"
                    id="password-confirm"
                    placeholder="введите пароль ещё раз"
                    autocomplete="on"
                >
                <p v-if="passwordConfirmError">{{ passwordConfirmError }}</p>
            </div>

            <button :disabled="isSubmitting || isTooManyAttempts" type="submit" class="btn-primary">Зарегистрироваться</button>
            <p v-if="isTooManyAttempts" class="invalid-colorOnly">Вы слишком часто пытались войти, подождите минуточку ...</p>
        </form>
        <router-link class="have-account-link" to="signin">уже есть аккаунт?</router-link>
    </div>
</template>

<script lang="js">
import { useRegistrForm } from '@/use/useRegistrForm'


export default {
    components: {},
    setup() {


        return {
            ...useRegistrForm()
        }
    },
}

</script>


<style scoped lang='scss'>
@import '@/styles/authPage.scss';
</style> 