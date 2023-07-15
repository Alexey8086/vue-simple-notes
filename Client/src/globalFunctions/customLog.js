export default function customLog (param) {
    // логика функции выполняется только в режиме разработки
    if (process.env.VUE_APP_MODE == 'development') {
        console.log('\x1b[38;2;164;232;87m%s\x1b[0m', 'Custom log message:')
        console.log(param)
    }
}