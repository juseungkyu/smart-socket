const router = require('express').Router()
const controller = require('../../Controller/MemberController')

const joinController = new controller.memberCreateController
const loginController = new controller.memberLoginController
const logoutController = new controller.memberLogoutController

router.get('/logout', logoutController.doGet)
router.post('/login', loginController.doPost)
router.post('/join', joinController.doPost)

module.exports = router
