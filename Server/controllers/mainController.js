require('dotenv').config()
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const USER = require('../models/user_model')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const ApiError = require('../error/api_error')
const getUrl = require('../utils/getUrl')
const generateJwt = require('../utils/generateJwt')


class MainController {

  async signup (req, res, next) {

    try {
      const {email, password, name} = req.body
      const userId = uuidv4()

      // if email or password fields is EMPTY returns Error
      if (!email || !password) {
        return next(ApiError.badRequest(`Некорректный email или password BODY: ${req.body}`))
      }

      const candidate = await USER.findOne({email})

      // if user is EXIST then returns Error
      if (candidate) {
        return next(ApiError.badRequest('Пользователь с таким email уже существует'))
      }

      const avatar = await getUrl()
      const hashPassword = await bcrypt.hash(password, 5)
      const user = new USER({id: userId, email, password: hashPassword, name, avatar})
      const userData = await user.save()
      const token = generateJwt(userData.id, userData.email, userData.name, userData.avatar)

      res.json({token})

    } catch (error) {
      console.warn('Error from registration', error)
    }
    
  }

  async signin (req, res, next) {

    try {
      const {email, password} = req.body
      const user = await USER.findOne({email})
  
      if (!user) {
        return next(ApiError.internal('Пользователя с таким email не зарегистрирован в системе!'))
      }
  
      const comparePassword = bcrypt.compareSync(password, user.password)
      if (!comparePassword) {
        return next(ApiError.internal('Указан неверный пароль!'))
      }
  
      const token = generateJwt(user.id, user.email, user.name, user.avatar)
  
      res.json({token})
    } catch (error) {
      console.warn('Error from login', error)
    }
  }

  async update (req,  res, next) {
    try {
      const {name, email, password, uid} = req.body
      const user = await USER.findOne({id: uid})
      const hashPassword = await bcrypt.hash(password, 5)
      user.name = name
      user.email = email
      user.password = hashPassword

      await user.save()
      const token = generateJwt(user.id, user.email, user.name, user.avatar)
  
      res.json({token, message: `Данные успешно обновлены`})
    } catch (e) {
      return next(ApiError.internal(`Произошла ошибка: ${e}`))
    }
  }


  async checkAuth(req, res) {
    let token = null

    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1]
    }

    try {
      // Promisify jwt.verify to convert it into a promise-based function
      const verifyToken = promisify(jwt.verify)
      const decoded = await verifyToken(token, process.env.NODE_JWT_KEY)
  
      res.json({ token: decoded })
    } catch (e) {
      res.status(401).json(null)
    }
  }

  async getUser (req, res, next) {
    try {

      const { id } = req.user

      if (!id) {
        return new Error("Пользователь не авторизован")
      } else {
        const db_responce = await USER.findOne({id:id})
        res.json({user: db_responce})
      }
  
    } catch (error) {
      console.warn('Error to getting User from data base', error)
    }
  }

}

module.exports = new MainController()