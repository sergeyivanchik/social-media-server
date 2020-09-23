const router = require('express').Router()
const chatController = require('../controllers/chat')


router.route('/:userId')
  .get(chatController.getCurrentUserChats)

module.exports = router
