const router = require('express').Router()
const apiRouter = require('./api')

router.use((req, res, next) => {
    res.contentType('application/json')

    if (req.user) {
        res.app.get('resetSession')(req, res)
    }

    next()
})

router.use('/api', apiRouter)

module.exports = router