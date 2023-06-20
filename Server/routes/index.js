const Router = require('express')
const router = new Router()
const mainRouter = require('./mainRouter')
const notesRouter = require('./notesRouter')
// const settingsRouter = require('./settingsRouter')
// const uploadsRouter = require('./uploadsRouter')

router.use('/user', mainRouter)
router.use('/notes', notesRouter)
// router.use('/settings', settingsRouter)
// router.use('/uploads', uploadsRouter)

module.exports = router