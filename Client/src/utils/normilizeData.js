// функция принимает timestamp и возвращает дату с временем в виде hh:mm, dd.mm.yyyy
import { getDate } from './getDate'

// функция принимает строку и кол-во символов
// укорачивая строку до заданного кол-ва символов
function shortenString(str, symbolsAmount) {
    if (str.length > symbolsAmount) {
      return str.substring(0, symbolsAmount) + '...'
    }
    return str
}

// функция приводит массив данных к упрощенному виду
// для вывода превью заметки с отрывком содержимого (текста), заголовком и датой создания
export function normalizeData(data) {
    const normalizedData = []

    if (Array.isArray(data)) {

        if (data.length === 0) return null

        data.forEach(note => {
            const obj = {
                id: note.id,
                content: 'Заметка пустая',
                title: 'Заголовок отсутсвует',
                date: getDate(note.time)
            }

            let paragraphNotFounded = true
            let headingNotFounded = true

            // в отличие от foreach цикл forof возможно завершить "досрочно", используя return или break
            // цикл ищет самый первый параграф и заголовок
            // когда заметка пустая, то у неё отсутсвтвует поле bloks
            // для отлова таких случаев необходима проверка на наличие bloks
            if (note.blocks) {
                for (const block of note.blocks) {
                    if (block.type == "paragraph" && paragraphNotFounded) {
                        obj.content = shortenString(block.data.text, 120)
                        paragraphNotFounded = false
                    }
                    if (block.type == "header" && headingNotFounded) {
                        obj.title = shortenString(block.data.text, 30)
                        headingNotFounded = false
                    }
                    
                    if (!paragraphNotFounded && !headingNotFounded) break
                }
            }

            normalizedData.push(obj)
        })
    } else {
        // throw new Error('Paramentr type should be an Array!')
        return null
    }

    console.log("NORMILIZE   ____  ", normalizedData.length)
    return normalizedData
}
