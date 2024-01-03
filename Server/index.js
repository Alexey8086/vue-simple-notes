
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes/index')


const PORT = process.env.NODE_PORT || 5000
const DB_URI = process.env.NODE_DB_URI || ''
const errorHandler = require('./middleware/error_middleware')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('uploads'))

app.use(express.urlencoded({extended: true}))
app.use('/api', router)

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
