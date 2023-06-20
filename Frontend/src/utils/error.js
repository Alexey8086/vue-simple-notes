const ERROR_CODES = {
    EMAIL_NOT_FOUND: 'Пользователь с таким e-mail не найден!',
    INVALID_PASSWORD: 'Похоже вы ввели неверный пароль',
    ACCESS_DENIED: 'В доступе отказано, необходима авторизация'
}

export function error(code) {
    const c = code.toUpperCase()

    return ERROR_CODES[c] ? ERROR_CODES[c] : 'Произошла неизвестная ошибка'
}