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
        const {deviceId} = req.params

        if(!deviceId) {
            this.sendResponse(false, 400, {message:'bad request'}, res);
            return
        }

        const info = await this.deviceDAO.getAllDevice(memberId);

        if (info.isSuccess) {
            this.sendResponse(true, 200, info.result, res);
        } else {
            this.sendResponse(false, 404, {message:'디바이스 조회 실패'}, res)
        }
    }
    
}