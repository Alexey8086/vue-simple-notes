const ERROR_CODES = {
    EMAIL_NOT_FOUND: 'Пользователь с таким e-mail не найден!',
    INVALID_PASSWORD: 'Похоже вы ввели неверный пароль!',
    ACCESS_DENIED: 'В доступе отказано, необходима авторизация',
    'auth/wrong-password': 'Похоже вы ввели неверный пароль!',
    'auth/too-many-requests': 'Попробуйте позже'
}

export function error(code) {
    if (code == 'auth/wrong-password') return 'Похоже вы ввели неверный пароль!'

    if (code == 'auth/too-many-requests') return 'Попробуйте позже'

    return ERROR_CODES[code] ? ERROR_CODES[code] : 'Произошла неизвестная ошибка'
}