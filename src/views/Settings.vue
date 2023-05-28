<template>
    <div class="home-link">
        <ArrowBackIcon width="35px" height="35px" color="#000000" />
        <span @click="pushUrl('/home')">Вернуться домой</span>
    </div>

    <div class="container">
        <div class="info">
            <img id="info__avatar" src="#" alt="ваша аватарка">
            <span id="info__username">John Dou</span>
            <button id="info__change-img-btn" class="btn-primary">изменить изображение</button>
        </div>

        <form @submit.prevent="onSubmit" action="" method="post">
            <div class="form-group">
                <label for="username">Новое имя:</label>
                <input
                    v-model="username"
                    @blur="usernameBlur"
                    :class="['', {invalid: usernameError}, {valid: usernameMeta.dirty && !usernameError}]"
                    type="text"
                    id="username"
                    placeholder="введите ваше новое имя"
                    autocomplete="on"
                >
                <p v-if="usernameError">{{ usernameError }}</p>
            </div>
            <div class="form-group">
                <label for="email">Новый e-mail:</label>
                <input
                    id="email"
                    placeholder="введите ваш новый email"
                    v-model="email"
                    @blur="emailBlur"
                    :class="['', {invalid: emailError}, {valid: emailMeta.dirty && !emailError}]"
                    autocomplete="on"
                >
                <p v-if="emailError">{{ emailError }}</p>
            </div>
            <div class="form-group">
                <label for="password">Новый пароль:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="введите новый пароль"
                    v-model="password"
                    @blur="passwordBlur"
                    :class="['', {invalid: passwordError}, {valid: passwordMeta.dirty && !passwordError}]"
                    autocomplete="on"
                >
                <p v-if="passwordError">{{ passwordError }}</p>
            </div>
            <div class="form-group">
                <label for="password-confirm">Подтверждение пароля:</label>
                <input
                    type="password"
                    id="password-confirm"
                    placeholder="повторите новый пароль"
                    v-model="passwordConfirm"
                    @blur="passwordConfirmBlur"
                    :class="['', {invalid: passwordConfirmError}, {valid: passwordConfirmMeta.dirty && !passwordConfirmError}]"
                    autocomplete="on"
                >
                <p v-if="passwordConfirmError">{{ passwordConfirmError }}</p>
            </div>

            <button  :disabled="isSubmitting || isTooManyAttempts" type="submit" class="btn-primary">сохранить</button>
            <p v-if="isTooManyAttempts" class="invalid-colorOnly">Вы слишком часто пытались, подождите минуточку ...</p>
        </form>
    </div>
</template>

<script>
import ArrowBackIcon from '@/components/icons/ArrowIcon.vue'
import navigate from '@/use/navigate.js'
import { useSettingsForm } from '@/use/useSettingsForm'

export default {
    name: '',
    components: { ArrowBackIcon },
    props: [''],
    emits: [''],

    setup() {



        return {
            pushUrl: navigate().pushUrl,
            ...useSettingsForm()
        }
    }
}

</script>

<style scoped lang='scss'>
@import '@/styles/settings.scss';
</style> 