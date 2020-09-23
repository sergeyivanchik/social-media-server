const router = require('express').Router()

router.use('/users', require('./user'))
router.use('/chats', require('./chat'))

module.exports = router
