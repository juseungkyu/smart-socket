const Controller = require('../Controller');
const DeleteController = require('./DeleteController');
const CreateController = require('./CreateController');
const MemberDAO = require('../../DAO/MemberDAO');

module.exports = class AdminController extends Controller {
    constructor() {
        super();
        this.memberDAO = new MemberDAO()
        this.controllers = {
            delete : new DeleteController().get,
            create : new CreateController().post
        }
    }

    /**
     * 디바이스 생성 post 요청을 수행함
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    process = async (req, res, requestProcess)=>{
        const memberId = req.session.member_id

        // 세션 검사
        if (!memberId) {
            this.sendResponse(false, 403, {message:'세션이 없습니다.'}, res);
            return
        }

        const {result, isSuccess} = await this.memberDAO.getMember(memberId);
        const member = result[0]

        if(!member) {
            this.sendResponse(false, 403, {message:'확인되지 않은 아이디 입니다.'}, res);
            return
        }

        if (!member.is_admin) {
            this.sendResponse(false, 403, {message:'관리자가 아닙니다.'}, res);
            return
        }

        // 요청 작업 수행
        const process = this.controllers[requestProcess]

        if(!process || typeof process !== 'function') {
            this.sendResponse(false, 400, {message:'올바르지 않은 요청입니다.'}, res);
            return
        }

        process(req, res)
    }   
}