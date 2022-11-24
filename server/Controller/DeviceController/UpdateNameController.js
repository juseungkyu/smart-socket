const Controller = require('../Controller');

const DeviceDAO = require('../../DAO/DeviceDAO');

const DeviceVO = require('../../VO/Device');
const MemberVO = require('../../VO/Member');

module.exports = class UpdateNameController extends Controller {
    constructor() {
        super();
        
        this.deviceDAO = new DeviceDAO()
    }

    post = async (req, res)=>{
        const {deviceId, deviceName} = req.body

        if(!deviceId || !deviceName) {
            console.log(deviceId, deviceName)
            this.sendResponse(false, 400, {message:'디바이스 아이디 값이 확인되지 않았습니다.'}, res);
            return
        }

        const time = Date.now()
        const {isSuccess, result} = await this.deviceDAO.changeDevice(deviceId, deviceName);

        if (isSuccess) {
            this.sendResponse(true, 200, result, res);
        } else {
            this.sendResponse(false, 400, {message:'서버 연결 실패'}, res)
        }
    }
    
}