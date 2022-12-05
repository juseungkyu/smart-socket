const Controller = require('../Controller');

const DeviceDAO = require('../../DAO/DeviceDAO');

const DeviceVO = require('../../VO/Device');
const MemberVO = require('../../VO/Member');

module.exports = class UpdateStateController extends Controller {
    constructor() {
        super();
        
        this.deviceDAO = new DeviceDAO()
    }

    /**
     * 디바이스 상태 변경 post 요청 수행
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    post = async (req, res)=>{
        const {deviceId, state} = req.body

        // 올바른 요청인지 검사
        if(!deviceId || !state) {
            this.sendResponse(false, 400, {message:'디바이스 아이디 값이 확인되지 않았습니다.'}, res);
            return
        }

        if(!state) {
            this.sendResponse(false, 400, {message:'디바이스 상태 값이 확인되지 않았습니다.'}, res);
            return
        }

        // 디바이스 상태 변경
        const {isSuccess, result} = await this.deviceDAO.changeDeviceState(deviceId, state);

        if (isSuccess) {
            this.sendResponse(true, 200, result, res);
        } else {
            this.sendResponse(false, 400, {message:'서버 연결 실패'}, res)
        }
    }
    
}