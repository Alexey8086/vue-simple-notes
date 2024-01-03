const Router = require('express')
const router = new Router()
const noteController = require('../controllers/noteController')
const authMiddleware = require('../middleware/auth_middleware')


router.post('/create', authMiddleware, noteController.create)
router.post('/update', authMiddleware, noteController.update)
router.post('/search', authMiddleware, noteController.search)
router.post('/more',  authMiddleware, noteController.moreNotes)
router.get('/all',  authMiddleware, noteController.getAllNotes)
router.get('/delete', authMiddleware, noteController.deleteOne)
router.get('/:id', authMiddleware, noteController.getOne)


module.exports = router