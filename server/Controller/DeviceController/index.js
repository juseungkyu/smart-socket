const heartbeatController = require('./HeartbeatController')
const createController = require('./CreateController')
const updateStateController = require('./UpdateStateController')
const updateNameController = require('./UpdateNameController')
const getDeviceController = require('./GetDeviceController')
const getAllDeviceController = require('./GetAllDeviceController')


module.exports = {
    heartbeatController,
    createController,
    updateStateController,
    getAllDeviceController,
    getDeviceController,
    updateNameController,
}
  