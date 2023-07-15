import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

export function useLoginForm () {

    const store = useStore()
    const router = useRouter()
    const {handleSubmit, isSubmitting, submitCount, } = useForm()

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

    const isTooManyAttempts = computed(() => submitCount.value >= 5)

    watch(isTooManyAttempts, (value) => {
        if (value) {
            setTimeout(() => submitCount.value = 0, 8000)
        }
    })

    const onSubmit = handleSubmit(async (values) => {
        try {
            const isAuthSucceed = await store.dispatch('auth/login', values)
            isAuthSucceed ? router.push('/home') : null
        } catch (error) {
            console.log('Error from Submit form -->', error)
        }
    })

    return {
        email,
        emailMeta,
        emailError,
        password,
        passwordMeta,
        passwordError,
        isSubmitting,
        isTooManyAttempts,

        emailBlur,
        passwordBlur,
        onSubmit,
    }
}