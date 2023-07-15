const Router = require('express')
const router = new Router()
const mainRouter = require('./mainRouter')
const notesRouter = require('./notesRouter')

router.use('/user', mainRouter)
router.use('/notes', notesRouter)

module.exports = router