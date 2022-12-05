const router = require('express').Router();
const controller = require('../Controller/AdminController');

const adminController = new (controller.adminController)();

router.post('/create', (req, res)=> {
    adminController.process(req, res, 'create');
})
router.get('/delete', (req, res)=> {
    adminController.process(req, res, 'delete');
})

module.exports = router
