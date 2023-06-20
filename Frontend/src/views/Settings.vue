<template>
    <div class="home-link">
        <ArrowBackIcon width="35px" height="35px" color="#000000" />
        <span @click="pushUrl('/home')">Вернуться домой</span>
    </div>

    <div class="container">
        <div class="info">
            <img id="info__avatar" :src="user?.avatar" alt="ваша аватарка">
            <span id="info__username">{{ user?.name }}</span>
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
                    autocomplete="on"
                    id="username"
                    placeholder="введите ваше новое имя"
                >
                <p v-if="usernameError">{{ usernameError }}</p>
            </div>
            <div class="form-group">
                <label for="email">Новый e-mail:</label>
                <input
                    v-model="email"
                    @blur="emailBlur"
                    :class="['', {invalid: emailError}, {valid: emailMeta.dirty && !emailError}]"
                    type="email"
                    id="email"
                    autocomplete="on"
                    placeholder="введите ваш новый email"
                >
                <p v-if="emailError">{{ emailError }}</p>
            </div>
            <div class="form-group">
                <label for="password">Новый пароль:</label>
                <input
                    v-model="password"
                    @blur="passwordBlur"
                    :class="['', {invalid: passwordError}, {valid: passwordMeta.dirty && !passwordError}]"
                    type="password"
                    id="password"
                    autocomplete="on"
                    placeholder="введите новый пароль"
                >
                <p v-if="passwordError">{{ passwordError }}</p>
            </div>
            <div class="form-group">
                <label for="password=confirm">Подтверждение пароля:</label>
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
            <button :disabled="isSubmitting || isTooManyAttempts" type="submit" class="btn-primary">Сохранить</button>
            <p v-if="isTooManyAttempts" class="invalid-colorOnly">Вы сделали слишком много попыток, подождите минуточку ...</p>
        </form>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import ArrowBackIcon from '@/components/icons/ArrowIcon.vue'
import navigate from '@/use/navigate.js'
import { useSettingsForm } from '@/use/useSettingsForm'


export default {
    name: '',
    components: { ArrowBackIcon },
    props: [''],
    emits: [''],

    setup() {
        const store = useStore()
        const user = ref(null)

        onMounted(async () => {
            await store.dispatch('auth/getUser')
            user.value = store.getters['auth/user']
        })


        return {
            ...useSettingsForm(),
            pushUrl: navigate().pushUrl,
            user
        }
    }
}

</script>

<style scoped lang='scss'>
@import '@/styles/settings.scss';
</style> 