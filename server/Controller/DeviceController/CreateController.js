const Controller = require('../Controller');

const DeviceDAO = require('../../DAO/DeviceDAO');

const DeviceVO = require('../../VO/Device');
const MemberVO = require('../../VO/Member');

module.exports = class CreateController extends Controller {
    constructor() {
        super();
        
        this.deviceDAO = new DeviceDAO()
    }

    /**
     * 디바이스 등록 post 요청을 수행함
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    post = async (req, res)=>{
        const {deviceId, deviceName, parentDevice} = req.body
        const memberId = req.session.member_id

        // 세션 검사
        if (!memberId) {
            this.sendResponse(false, 400, {message:'세션이 값이 없습니다.'}, res);
            return
        }

        // 올바른 요청인지 검사
        if (!deviceId || !deviceName || !parentDevice) {
            this.sendResponse(false, 400, {message:'잘못된 요청입니다.'}, res);
            return
        }

        // 디바이스 등록
        const info = await this.deviceDAO.applicationDevice(deviceId, deviceName, parentDevice, memberId)
        
        if (info.isSuccess) {
            this.sendResponse(true, 200, {message:'디바이스 생성 성공'}, res);
        } else {
            this.sendResponse(false, 404, {message:'디바이스 생성 실패'}, res)
        }
    }
    
}