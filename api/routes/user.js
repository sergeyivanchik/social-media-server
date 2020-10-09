const router = require('express').Router()
const userController = require('../controllers/user.js')


router.route('/setUser')
  .post(userController.setUser)

router.route('/user/:id')
  .get(userController.getUser)

router.route('/incomingFriendRequests/:userId')
  .get(userController.getIncomingFriendRequests)

router.route('/outgoingFriendRequests/:userId')
  .get(userController.getOutgoingFriendRequests)

module.exports = router
