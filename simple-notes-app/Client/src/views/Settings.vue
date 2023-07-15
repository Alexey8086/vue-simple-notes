<template>
    <div class="home-link">
        <ArrowBackIcon width="35px" height="35px" color="#000000" />
        <span @click="pushUrl('/home')">Вернуться домой</span>
    </div>

    <div class="container">
        <div class="info">
            <img id="info__avatar" :src="imageUrl.value ? imageUrl.value : user?.avatar" alt="ваша аватарка">
            <span id="info__username">{{ user?.name }}</span>

            <input
                type="file"
                name="file"
                @change="onFileChange"
                id="uploadImgInput"
                form="submitForm"
            >
            <label id="info__change-img-btn" class="btn-primary" for="uploadImgInput">изменить изображение</label>
            <p v-if="selectedFile.value" class="info__label"><span>Файл выбран:</span> {{ selectedFile.value.name }}</p>
        </div>

        <form id="submitForm" @submit.prevent="onSubmit" action="" enctype="multipart/form-data" method="post">
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
import { onMounted, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import ArrowBackIcon from '@/components/icons/ArrowIcon.vue'
import navigate from '@/use/navigate.js'
import { useField } from 'vee-validate'
import * as yup from 'yup'
import { useSettingsForm } from '@/use/useSettingsForm'
import { retrieveImage } from '@/utils/retrieveImage.js'


export default {
    name: '',
    components: { ArrowBackIcon },
    props: [''],
    emits: [''],

    setup() {
        const store = useStore()
        const user = ref(null)
        const selectedFile = reactive({})
        const imageUrl = reactive({value: ''})
        const altText = ref('Uploaded Image')

        const { value: file, errorMessage: fileError, handleBlur: fileBlur, meta: fileMeta } = useField(
        'file',
        yup
          .mixed()
          .required('Please select a file')
      )

        const onFileChange = (event) => {
            console.log('Hi from onFileChange !!!! ', event.target.files[0])
            selectedFile.value = event.target.files[0]
            // Обновляем значение поля 'file' в объекте 'useFiled'
            file.value = selectedFile.value
        }


        onMounted(async () => {
            await store.dispatch('auth/getUser')
            user.value = store.getters['auth/user']

            const uploadedImage = await retrieveImage(user.value.userImg.data)
            imageUrl.value = uploadedImage.imageUrl
            altText.value = uploadedImage.altText
        })


        return {
            ...useSettingsForm(file),
            onFileChange,
            pushUrl: navigate().pushUrl,
            user,
            selectedFile,

            imageUrl,
            altText,
        }
    }
}

</script>

<style scoped lang='scss'>
@import '@/styles/settings.scss';

#uploadImgInput {
    display: none;
}

.info__label {
    color: var(--primary-cyan)!important;
    text-decoration-color: var(--primary-cyan);

    &>span {
        color: var(--main-text);
    }
}
</style> 