const Controller = require('../Controller');

const MemberDAO = require('../../DAO/MemberDAO');

const MemberVO = require('../../VO/Member');

module.exports = class MemberLoginController extends Controller {
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

        const {isSuccess} = await this.MemberDAO.loginMember(memberId, memberPw)

        if (isSuccess) {
            this.sendResponse(true, 200, {message:'로그인 성공'}, res);
        } else {
            this.sendResponse(false, 404, {message:'유저 정보 확인 실패'}, res);
        }
    }
    
}