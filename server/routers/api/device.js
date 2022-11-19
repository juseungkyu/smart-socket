const router = require('express').Router()
const controller = require('../../Controller/DeviceController')

const heartbeatController = new controller.heartbeatController
const createController = new controller.createController
const updateStateController = new controller.updateStateController
const getDeviceController = new controller.getDeviceController
const getAllDeviceController = new controller.getDeviceController

router.get('/:deviceId', getDeviceController.doGet)
router.get('/:deviceId/all', getAllDeviceController.doGet)
router.get('/heartbeat:deviceId', heartbeatController.doGet)
router.post('/create', createController.doPost)
router.post('/update-state/:state', updateStateController.doPost)

module.exports = router
