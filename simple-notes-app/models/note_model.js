const {Schema, model} = require('mongoose')

const dataSchema = new Schema({
    type: String,
    items: Array,
    text: String,
    level: Number
  })

const blockSchema = new Schema({
    id: String,
    type: String,
    data: dataSchema
  })

const Note = new Schema({
    id: {
        type: String,
        require: true,
        unique: true
    },
    uid: {
        type: String,
        require: true,
        unique: false
    },
    blocks: [blockSchema],
    time: {
        type: Number,
        require: false,
        unique: false
    },
    version: {
        type: String,
        require: false,
        unique: false
    }
})

// первый параметр - название модели, второй - схема модели
module.exports = model('Note', Note)