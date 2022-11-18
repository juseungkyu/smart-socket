const router = require('express').Router()
const controller = require('../../Controller/MemberController')
const joinController = controller.joinController
const loginController = controller.loginController
const logoutController = controller.logoutController

router.get('/logout', logoutController.doGet)
router.post('/login', loginController.doPost)
router.post('/join', joinController.doPost)

module.exports = router
