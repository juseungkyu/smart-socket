const Controller = require('../Controller');

const DeviceDAO = require('../../DAO/DeviceDAO');

const DeviceVO = require('../../VO/Device');
const MemberVO = require('../../VO/Member');

module.exports = class GetDeviceController extends Controller {
    constructor() {
        super();
        
        this.deviceDAO = new DeviceDAO()
    }

    get = (req, res)=>{
        console.log('hello')
        console.log(req.params)

        this.sendResponse(true, 200, {message:req.params}, res);
    }
    
}