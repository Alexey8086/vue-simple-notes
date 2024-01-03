const Router = require('express')
const router = new Router()
const MainController = require('../controllers/mainController')
const authMiddleware = require('../middleware/auth_middleware')
// для загрузки файлов используем multer
const multer = require('multer')


const storage = multer.memoryStorage()
const upload = multer({ storage })


router.post('/signup', MainController.signup)
router.post('/signin', MainController.signin)
router.post('/update', authMiddleware, upload.single('file'), MainController.update)
router.post('/getUser', authMiddleware, MainController.getUser)
router.post('/checkAuth', MainController.checkAuth)

module.exports = router