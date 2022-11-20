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
            this.sendSuccess(200, info, res)
        } else {
            this.sendFailure(404, 'not found', res)
        }
    }
    
}