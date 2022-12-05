const Controller = require('../Controller');
const MemberDAO = require('../../DAO/MemberDAO');
const DeviceDAO = require('../../DAO/DeviceDAO');

module.exports = class CreateController extends Controller {
    constructor() {
        super();
        
        this.memberDAO = new MemberDAO()
        this.deviceDAO = new DeviceDAO()
    }

    /**
     * 디바이스 생성 post 요청을 수행함
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    post = async (req, res)=>{
        const {deviceId} = req.body

        // 올바른 요청인지 검사
        if (!deviceId) {
            this.sendResponse(false, 400, {message:'잘못된 요청입니다.'}, res);
            return
        }

        // 디바이스 생성
        const info = await this.deviceDAO.createDevice(deviceId)
        
        if (info.isSuccess) {
            this.sendResponse(true, 200, {message:'디바이스 생성 성공'}, res);
        } else {
            this.sendResponse(false, 404, {message:'디바이스 생성 실패'}, res)
        }
    }
    
}