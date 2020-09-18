const router = require('express').Router()
const userController = require('../controllers/user.js')


router.route('/setUser')
  .post(userController.setUser)

router.route('/user/:id')
  .get(userController.getUser)

module.exports = router;