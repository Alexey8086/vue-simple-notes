const Router = require('express')
const router = new Router()
const MainController = require('../controllers/mainController')
const authMiddleware = require('../middleware/auth_middleware')

router.post('/signup', MainController.signup)
router.post('/signin', MainController.signin)
router.post('/update', authMiddleware, MainController.update)
router.post('/getUser', authMiddleware, MainController.getUser)
router.post('/checkAuth', MainController.checkAuth)

module.exports = router