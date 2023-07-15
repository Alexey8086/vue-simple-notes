import { computed, watch } from 'vue'
import { useField, useForm } from 'vee-validate'
import store from '@/store'
import * as yup from 'yup'
import { useRouter } from "vue-router"

export function useSettingsForm (file) {

    const router = useRouter()
    const { handleSubmit, isSubmitting, submitCount, values} = useForm()

    // с помощью ES6 задаем собственные имена полей для валидации формы
    // далее библиотека yup задает правила валидации поля
    const {value: email, errorMessage: emailError, handleBlur: emailBlur, meta: emailMeta} = useField(
        'email',
        yup
            .string('Введен некорректный email!')
            .trim()
            .required('Пожалуйста, введите email!')
            .email('Введен некорректный email!')

    )
    const {value: password, errorMessage: passwordError, handleBlur: passwordBlur, meta: passwordMeta} = useField(
        'password',
        yup
            .string()
            .trim()
            .required('Пожалуйста, введите пароль!')
            .min(6, 'Пароль должен содержать не менее 6 символов!')
            .max(14, 'Пароль должен содержать не более 14 символов!')

    )

    const {value: passwordConfirm, errorMessage: passwordConfirmError, handleBlur: passwordConfirmBlur, meta: passwordConfirmMeta} = useField(
        'passwordConfirm',
        yup
            .string()
            .trim()
            .test("passMatch", "Парли не совпадают", function (value) {
                return value === values['password']
            })
            .required('Пожалуйста, введите пароль ещё раз!')
    )

    const {value: username, errorMessage: usernameError, handleBlur: usernameBlur, meta: usernameMeta} = useField(
        'username',
        yup
            .string()
            .trim()
            .min(2, 'Минимальная длина имени 2 символа')
            .max(12, 'Максимальная длина имени 12 символов')
            .required('Введите ваше имя')
    )

    const isTooManyAttempts = computed(() => submitCount.value >= 5)

    watch(isTooManyAttempts, (val) => {
        if (val) {
            setTimeout(() => submitCount.value = 0, 8000)
        }
    })

    const onSubmit = handleSubmit(async (val) => {
        try {
            const formData = new FormData()
            formData.append('file', file.value)
            formData.append('username', val.username)
            formData.append('email', val.email)
            formData.append('password', val.password)
            formData.append('passwordConfirm', val.passwordConfirm)
        
            const FormDataValues = {}
            for (const [key, value] of formData.entries()) {
              FormDataValues[key] = value
            }
        
            // console.log("onSubmit DATA ----->>>>> ", FormDataValues)
            await store.dispatch('auth/updateProfile', FormDataValues)
            router.push('/home')
        } catch (error) {
            console.log('Error from Submit form -->', error)
        }
    })

    return {
        username,
        usernameMeta,
        usernameError,
        email,
        emailError,
        emailMeta,
        password,
        passwordMeta,
        passwordError,
        passwordConfirm,
        passwordConfirmError,
        passwordConfirmMeta,
        isSubmitting,
        isTooManyAttempts,

        usernameBlur,
        emailBlur,
        passwordBlur,
        passwordConfirmBlur,
        onSubmit,
    }
}