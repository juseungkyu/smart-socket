const router = require('express').Router()

const deviceRouter = require('./device')
const memberRouter = require('./member')

router.use((req, res, next) => {
    console.log('요청 들어옴')
    res.contentType('application/json')
    next()
})

router.use('/device', deviceRouter)
router.use('/member', memberRouter)

module.exports = router