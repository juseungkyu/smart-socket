const Controller = require('../Controller');

const DeviceDAO = require('../../DAO/DeviceDAO');

const DeviceVO = require('../../VO/Device');
const MemberVO = require('../../VO/Member');

module.exports = class CreateController extends Controller {
    constructor() {
        super();
        
        this.deviceDAO = new DeviceDAO()
    }

    post = async (req, res)=>{
        const {deviceId, deviceName} = req.body
        const memberId = req.session.member_id

        if (!memberId || !deviceId || !deviceName) {
            this.sendResponse(false, 400, {message:'bad request'}, res);
            return
        }

        const info = await this.deviceDAO.applicationDevice(deviceId, deviceName, memberId)
        
        if (info.isSuccess) {
            this.sendResponse(true, 200, {message:'디바이스 생성 성공'}, res);
        } else {
            this.sendResponse(false, 400, {message:'디바이스 생성 실패'}, res)
        }
    }
    
}