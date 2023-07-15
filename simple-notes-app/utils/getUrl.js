const axios = require('axios')

// возвращает url до случайной svg автарки пользователя
const getUrl = async () => {
    // обращаемся к api генератору случайных имен
    const {data} = await axios.get('https://randomuser.me/api/?inc=name')
    // забираем первое имя
    const name = data.results[0].name.first
    // формируем url к api генератору аватарок, задаём имя аватара и задний фон
    // const url = `https://avatars.dicebear.com/api/avataaars/${name}.svg?background=%23F9F0FF`
    const url = `https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${name}`
    
    return url
}

module.exports = getUrl