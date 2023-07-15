const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateJwt = (id, email, name, avatar) => {
    return jwt.sign(
      { id, email, name, avatar},
      process.env.NODE_JWT_KEY,
      { expiresIn: '10h' }
    )
  }

module.exports = generateJwt