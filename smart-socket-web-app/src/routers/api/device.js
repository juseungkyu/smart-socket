const router = require('express').Router()
const controller = require('../../Controller/DeviceController')
const heartbeatController = controller.heartbeatController
const createController = controller.createController
const updateStateController = controller.updateStateController

router.get('/heartbeat', heartbeatController.doGet())
router.post('/create', createController.doPost())
router.post('/update-state/:state', updateStateController.doPost())

module.exports = router
