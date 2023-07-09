
require('dotenv').config()
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const router = require('./routes/index')


const PORT = process.env.NODE_PORT || 5000
const DB_URI = process.env.NODE_MONGO_URI || ''
const variables_middleware = require('./middleware/var_middleware.js')
const errorHandler = require('./middleware/error_middleware')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('uploads'))
// app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')))

app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: process.env.NODE_SESS_KEY,
  resave: false,
  saveUninitialized: false
}))

app.use('/api', router)
app.use(variables_middleware)

// if (config.node_env === 'production') {
//   console.log('PRODUCTION MODE INABLE')
//   app.use('/', express.static(path.join(__dirname, '../frontend/build')))
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
//   })
// }

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