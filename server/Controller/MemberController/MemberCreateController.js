const Controller = require('../Controller');

const DeviceDAO = require('../../DAO/MemberDAO');

const MemberVO = require('../../VO/Member');

module.exports = class HeartbeatController extends Controller {
    constructor() {
        super();
        
        this.deviceDAO = new DeviceDAO()
    }

    get = async (req, res)=>{
        console.log(req.params)
    }
    
}