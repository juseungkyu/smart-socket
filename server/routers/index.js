const router = require('express').Router()
const apiRouter = require('./api')

router.use((req, res, next) => {
    res.contentType('application/json')

    next()
})

router.use('/api', apiRouter)

module.exports = router