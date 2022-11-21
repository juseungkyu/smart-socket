const Controller = require('../Controller');
const MemberDAO = require('../../DAO/MemberDAO');
const MemberVO = require('../../VO/Member');



module.exports = class MemberCreateController extends Controller {
    constructor() {
        super();
        this.memberDAO = new MemberDAO()
    }

    post = async (req, res) => {
        const { memberId, memberPw } = req.body
        if (!memberId || !memberPw) {
            this.sendResponse(false, 400, {message:'bad request'}, res);
            return
        }

        const {info, isSuccess} = await this.memberDAO.createMember(memberId, memberPw)

        if (isSuccess) {
            this.sendResponse(true, 200, {message:'멤버 생성 성공'}, res);
        } else {
            this.sendResponse(false, 404, {message:'멤버 생성 실패'}, res)
        }
    }
    
}