const router = require('express').Router()
const controller = require('../Controller/MemberController')

const memberCreateController = new controller.memberCreateController()
const memberLoginController = new controller.memberLoginController()
const memberLogoutController = new controller.memberLogoutController()

router.get('/logout', memberLogoutController.get)
router.post('/login', memberLoginController.post)
router.post('/join', memberCreateController.post)

module.exports = router
