const Controller = require('../Controller');
const MemberDAO = require('../../DAO/MemberDAO');
const DeviceDAO = require('../../DAO/DeviceDAO');

module.exports = class DeleteController extends Controller {
    constructor() {
        super();
        
        this.memberDAO = new MemberDAO()
        this.deviceDAO = new DeviceDAO()
    }

    /**
     * 디바이스 삭제 get 요청을 수행함
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    get = async (req, res)=>{
        const {deviceId} = req.body

        // 디바이스 삭제
        const info = await this.deviceDAO.deleteDevice(deviceId)
        
        if (info.isSuccess) {
            this.sendResponse(true, 200, {message:'디바이스 삭제 성공'}, res);
        } else {
            this.sendResponse(false, 404, {message:'디바이스 삭제 실패'}, res)
        }
    }
    
}