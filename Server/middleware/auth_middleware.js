require('dotenv').config()
const jwt = require('jsonwebtoken')
const { promisify } = require('util')


module.exports = async function (req, res, next) {

  // Example token {token_type token }: Bearer eyJhbGc.iOiJIUzI1NiIsInR5cC.I6IkpXVCJ9
  let token = null

  if (req.headers.authorization?.length) {
    token = req.headers.authorization.split(' ')[1]

    if (token.length < 10) {
      res.status(401).json({message: "Пользователь не авторизован!"})
    }
  }

  try {
    const verifyToken = promisify(jwt.verify)
    const decoded = await verifyToken(token, process.env.NODE_JWT_KEY)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401)
              .json({ message: 'Пользователь не авторизован! (попытка несанкционированного входа в систему)' })
  }  
}