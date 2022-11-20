const Controller = require('../Controller');

const MemberDAO = require('../../DAO/MemberDAO');

const MemberVO = require('../../VO/Member');

module.exports = class MemberChangeController extends Controller {
    constructor() {
        super();
        this.MemberDAO = new MemberDAO()
    }

    get = async (req, res) => {
        const { memberId, memberPwd, newMemberPwd } = req.query
        if (!userId || !userPwd || memberPwd!=newUserPwd) {
            this.sendResponse(false, 400, {message:'bad request'}, res)
            return
        }

        const info = await this.MemberDAO.modifyMemberPassword(userId, userPwd)

        if (info) {
            this.sendResponse(true, 200, {message:'비밀번호 변경 성공'}, res);
        } else {
            this.sendResponse(false, 404, {message:'비밀번호 변경 실패'}, res)
        }
    }

}