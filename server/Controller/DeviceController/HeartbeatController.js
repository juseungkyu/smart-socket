const Controller = require('../Controller');

const DeviceDAO = require('../../DAO/DeviceDAO');

const DeviceVO = require('../../VO/Device');
const MemberVO = require('../../VO/Member');

module.exports = class HeartbeatController extends Controller {
    constructor() {
        super();
        
        this.deviceDAO = new DeviceDAO()
    }

    /**
     * 디바이스 연결 유지 get 요청 수행
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    get = async (req, res)=>{
        const {deviceId} = req.params

        // 올바른 요청인지 검사
        if(!deviceId) {
            this.sendResponse(false, 400, {message:'디바이스 아이디 값이 확인되지 않았습니다.'}, res);
            return
        }

        // 연결 종료 타이머 종료
        const deviceTimerMap = req.app.get('deviceTimerMap');
        const beforeTimer = deviceTimerMap.get(deviceId)
        clearInterval(beforeTimer)

        // 연결 상태 수정
        const {isSuccess} = await this.deviceDAO.changeDeviceConnect(deviceId, 1)

        // 연결 종료 타이머 재설정
        const interval = setInterval(async ()=>{
            await this.deviceDAO.changeDeviceConnect(deviceId, 0)
            clearInterval(interval)
        }, 5000)
        deviceTimerMap.set(deviceId, interval)

        if (isSuccess) {
            this.sendResponse(true, 200, {message:'연결 성공'}, res);
        } else {
            this.sendResponse(false,400, {message:'서버 연결 실패'}, res)
        }
    }
    
}