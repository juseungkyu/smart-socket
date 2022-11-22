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
        console.log("요청 들어옴 1")
        const {deviceId, memberId} = req.body

        if (!memberId || !deviceId) {
            this.sendResponse(false, 400, {message:'bad request'}, res);
            return
        }

        const info = await this.deviceDAO.applicationDevice(deviceId, memberId)
        
        if (info.isSuccess) {
            this.sendResponse(true, 200, {message:'디바이스 생성 성공'}, res);
        } else {
            this.sendResponse(false, 404, {message:'디바이스 생성 실패'}, res)
        }
    }
    
}