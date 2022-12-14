const router = require('express').Router()
const controller = require('../Controller/DeviceController')

const heartbeatController = new controller.heartbeatController()
const createController = new controller.createController()
const updateStateController = new controller.updateStateController()
const getDeviceController = new controller.getDeviceController()
const getAllDeviceController = new controller.getAllDeviceController()
const updateNameController = new controller.updateNameController()

router.get('/all', getAllDeviceController.get)
router.get('/:deviceId', getDeviceController.get)
router.get('/heartbeat/:deviceId', heartbeatController.get)
router.post('/create', createController.post)
router.post('/update/name', updateNameController.post)
router.post('/update/state', updateStateController.post)

module.exports = router
