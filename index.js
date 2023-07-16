
require('dotenv').config()
// библиотека стилей для  вывода в терминале
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const router = require('./routes/index')


const PORT = process.env.NODE_PORT || 5000
const DB_URI = process.env.NODE_MONGO_URI || ''
const errorHandler = require('./middleware/error_middleware')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('uploads'))

app.use(express.urlencoded({extended: true}))
app.use('/api', router)

// при выгрузке приложения в продакшн необходимо
// при запросе (по url) приложения возращать статику
// (index.html и все скрипты подключенные к нему, соответственно)
if (process.env.NODE_ENV === 'production') {
  console.log('PRODUCTION MODE INABLE')

  app.use('/', express.static(path.join(__dirname, 'Client', 'dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'Client', 'dist', 'index.html'))
  })
}

app.use(errorHandler)

const start = async () => {
  try {
    await mongoose.connect(DB_URI)
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  } catch (e) {
    console.warn('INIT APPLICATION WARNING:', e)
  }
}

start ()