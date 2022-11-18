const router = require('express').Router()

const deviceRouter = require('./device')
const memberRouter = require('./member')

router.use('/device', deviceRouter)
router.use('/member', memberRouter)

module.exports = router