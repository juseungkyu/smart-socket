const router = require('express').Router()
const controller = require('../../Controller/MemberController')
const joinController = controller.joinController
const loginController = controller.loginController
const logoutController = controller.logoutController

router.get('/logout', logoutController.doGet())
router.post('/login', logoutController.doPost())
router.post('/join', logoutController.doPost())

module.exports = router
