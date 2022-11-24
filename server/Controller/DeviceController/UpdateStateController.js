const Controller = require('../Controller');

const DeviceDAO = require('../../DAO/DeviceDAO');

const DeviceVO = require('../../VO/Device');
const MemberVO = require('../../VO/Member');

module.exports = class UpdateStateController extends Controller {
    constructor() {
        super();
        
        this.deviceDAO = new DeviceDAO()
    }

    post = async (req, res)=>{
        const {deviceId, state} = req.body

        if(!deviceId || !state) {
            this.sendResponse(false, 400, {message:'디바이스 아이디 값이 확인되지 않았습니다.'}, res);
            return
        }

        if(!state) {
            this.sendResponse(false, 400, {message:'디바이스 상태 값이 확인되지 않았습니다.'}, res);
            return
        }

        const {isSuccess, result} = await this.deviceDAO.changeDeviceState(deviceId, state);

        if (isSuccess) {
            this.sendResponse(true, 200, result, res);
        } else {
            this.sendResponse(false, 400, {message:'서버 연결 실패'}, res)
        }
    }
    
}