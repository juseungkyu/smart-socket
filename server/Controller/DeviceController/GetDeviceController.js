const Controller = require('../Controller');

const DeviceDAO = require('../../DAO/DeviceDAO');

const DeviceVO = require('../../VO/Device');
const MemberVO = require('../../VO/Member');

module.exports = class GetDeviceController extends Controller {
    constructor() {
        super();
        
        this.deviceDAO = new DeviceDAO()
    }

    get  = async(req, res)=>{
        const {deviceId} = req.params

        if(!deviceId) {
            this.sendResponse(false, 400, {message:'디바이스 아이디 값이 확인되지 않았습니다.'}, res);
            return
        }

        const info = await this.deviceDAO.getDevice(deviceId);

        if (info.isSuccess) {
            this.sendResponse(true, 200, info.result[0], res);
        } else {
            this.sendResponse(false, 404, {message:'디바이스 조회 실패'}, res)
        }
    }
    
}