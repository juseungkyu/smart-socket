const router = require('express').Router()

const deviceRouter = require('./device')
const memberRouter = require('./member')

router.use((req, res) => {
    res.contentType('application/json')
})

router.use('/device', deviceRouter)
router.use('/member', memberRouter)

module.exports = router