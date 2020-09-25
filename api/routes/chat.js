const router = require('express').Router()
const chatController = require('../controllers/chat')


router.route('/:userId')
  .get(chatController.getCurrentUserChats)

router.route('/chat/:id/messages')
  .get(chatController.getMesssagesFromCurrentChat)

router.route('/chat/:id')
  .get(chatController.getCurrentChat)

module.exports = router
