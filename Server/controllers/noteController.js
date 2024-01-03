const NOTE = require('../models/note_model')
const { v4: uuidv4 } = require('uuid')
require('dotenv').config()


class NoteController {

  async search (req, res) {
    const { searchingValue, searchByHeading, searchByContent } = req.body
    const uid = req.user.id

    try {
      if (searchByHeading && searchingValue) {
        const notes = await NOTE.find({
            uid: uid,
            blocks: {
              $elemMatch: {
                "type": { $eq: "header" },
                "data.text": { $regex: searchingValue, $options: "i" },
              }
            }
        }).exec()
        
        return res.json(notes)
      }

      if (searchByContent && searchingValue) {
        const notes = await NOTE.find({
          uid: uid,
          blocks: {
            $elemMatch: {
              "type": { $ne: "header" },
              "data.text": { $regex: searchingValue, $options: "i" },
            }
          }
        }).exec()
        
        return res.json(notes)
      }

      if ((searchByContent && searchByHeading && searchingValue )|| (!searchByContent && !searchByHeading && searchingValue)) {
        const notes = await NOTE.find({
          uid: uid,
          blocks: {
            $elemMatch: {
              "data.text": { $regex: searchingValue, $options: "i" },
            }
          }
        }).exec()

        return res.json(notes)
      }

      const notes = await NOTE.find({uid: uid}).exec()
      return res.json(notes)

    } catch (e) {
        return res.json(`При поиске произошла ошибка: ${e}`)
    }
  }

  async create (req, res) {
    const { blocks, version, time } = req.body
    const { id } = req.user
    const noteId = uuidv4()

    try {
      const note = new NOTE({id: noteId, uid: id, blocks, version, time})
      await note.save()
      return res.json("Новая заметка успешно сохранена")

    } catch (e) {
        return res.json(`При сохранении заметки произошла ошибка: ${e}`)
    }
  }

  async update (req, res) {
    const { blocks, version, time, id } = req.body
    
    try {
      await NOTE.updateOne({ id: id }, { blocks, version, time })
      return res.json("Данные успешно обновлены")

    } catch (e) {
        return res.json(`При обновлении данных заметки произошла ошибка: ${e}`)
    }
  }

  async deleteOne (req, res) {
    const { id } = req.query

    try {
      const response = await NOTE.deleteOne({id: id})
      return res.json(response)

    } catch (e) {
        return res.json(`Ошибка при удалении заметки: ${e}`)
    }
  }

  async getAllNotes (req, res) {
    const { id } = req.user

    try {
      const notes = await NOTE.find({uid: id}).exec()
      res.json(notes)

    } catch (e) {
      return new Error(`Ошибка при получении данных: ${e}`)
      // res.json(`Ошибка при получении данных: ${e}`)
    }
  }

  async moreNotes (req, res) {
    const { id } = req.user
    const { notes, limit } = req.body
    const amount = limit ? limit : 5
    const notesIds = notes.map(note => note.id)

    try {
      // const notes = await NOTE.find({uid: id}).exec()
      // res.json(notes)

      const notes = await NOTE.find({
        id: { $nin: notesIds },
        uid: id
      }).limit(amount).exec()

      res.json(notes)

    } catch (e) {
      return new Error(`Ошибка при получении данных: ${e}`)
      // res.json(`Ошибка при получении данных: ${e}`)
    }
  }

  // получаем одну заметку по user id и id самой заметки
  // (пользователь имеет доступ только к своим заметкам)
  async getOne (req, res) {
    const { id } = req.query
    const uid = req.user.id

    try {
      const note = await NOTE.findOne({id, uid})
      return res.json(note)

    } catch (e) {
        return res.json(`Ошибка при получении данных заметки: ${e}`)
    }
  }
}

module.exports = new NoteController()