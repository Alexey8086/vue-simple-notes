const path = require('path')

const Router = require('express')
const router = new Router()
const MainController = require('../controllers/mainController')
const authMiddleware = require('../middleware/auth_middleware')
// для загрузки файлов используем multer
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')


const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]
    if ( !allowedTypes.includes(file.mimetype)) {
        const error = new Error("Некорректный файл!")
        error.code = "INCORRECT_FILETYPE"

        return cb(error, false)
    }

    cb(null, true)
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '../uploads'))
    },
    fileFilter,
    filename: (req, file, cb) => {
        const uniqueHash = uuidv4()
        const originalName = file.originalname
        const filename = `image-${uniqueHash}-${originalName}`

      cb(null, filename)
    },
  })
  
const upload = multer({ storage })


router.post('/signup', MainController.signup)
router.post('/signin', MainController.signin)
router.post('/update', authMiddleware, upload.single('file'), MainController.update)
router.post('/getUser', authMiddleware, MainController.getUser)
router.post('/checkAuth', MainController.checkAuth)

module.exports = router