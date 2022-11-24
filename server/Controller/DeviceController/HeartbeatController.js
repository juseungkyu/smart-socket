const Controller = require('../Controller');

const DeviceDAO = require('../../DAO/DeviceDAO');

const DeviceVO = require('../../VO/Device');
const MemberVO = require('../../VO/Member');

module.exports = class HeartbeatController extends Controller {
    constructor() {
        super();
        
        this.deviceDAO = new DeviceDAO()
    }

    get = async (req, res)=>{
        const {deviceId} = req.params

        if(!deviceId) {
            this.sendResponse(false, 400, {message:'디바이스 아이디 값이 확인되지 않았습니다.'}, res);
            return
        }

        const deviceTimerMap = req.app.get('deviceTimerMap');
        const beforeTimer = deviceTimerMap.get(deviceId)
        clearTimeout(beforeTimer)
        const timer = setTimeout(()=>{
            this.deviceDAO.changeDeviceConnect(deviceId, 0)
        }, 5000)
        deviceTimerMap.set(deviceId, timer)

        const {isSuccess} = await this.deviceDAO.changeDeviceConnect(deviceId, 1)


        if (isSuccess) {
            this.sendResponse(true, 200, {message:'연결 성공'}, res);
        } else {
            this.sendResponse(false,400, {message:'서버 연결 실패'}, res)
        }
    }
    
}