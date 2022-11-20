const Controller = require('../Controller');
const MemberDAO = require('../../DAO/MemberDAO');
const MemberVO = require('../../VO/Member');

module.exports = class MemberCreateController extends Controller {
    constructor() {
        super();
        this.MemberDAO = new MemberDAO()
    }

    post = async (req, res) => {
        const { memberId, memberPw } = req.body
        if (!memberId || !memberPw) {
            this.sendResponse(false, 400, {message:'bad request'}, res);
            return
        }

        const info = await this.MemberDAO.createMember(memberId, memberPw)

        if (info) {
            this.sendResponse(true, 200, info, res)
        } else {
            this.sendResponse(false, 404, {message:'멤버 생성 실패'}, res)
        }
    }
    
}