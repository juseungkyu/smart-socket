const Controller = require('../Controller');

const DeviceDAO = require('../../DAO/DeviceDAO');

const DeviceVO = require('../../VO/Device');
const MemberVO = require('../../VO/Member');

module.exports = class GetAllDeviceController extends Controller {
    constructor() {
        super();
        
        this.deviceDAO = new DeviceDAO()
    }

    /**
     * 디바이스 모두 조회 get 요청을 수행함
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    get = async (req, res)=>{
        const memberId = req.session.member_id

        // 세션 확인
        if(!memberId) {
            this.sendResponse(false, 400, {message:'세션이 확인되지 않습니다.'}, res);
            return
        }

        // 디바이스 조회
        const info = await this.deviceDAO.getListDevice(memberId);

        if (info.isSuccess) {
            this.sendResponse(true, 200, info.result, res);
        } else {
            this.sendResponse(false, 404, {message:'디바이스 조회 실패'}, res)
        }
    }
    
}