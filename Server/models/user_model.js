const {Schema, model} = require('mongoose')

const User = new Schema({
    id: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        require: false
    }
})

// первый параметр - название модели, второй - схема модели
module.exports = model('User', User)