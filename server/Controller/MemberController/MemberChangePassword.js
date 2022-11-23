const Controller = require('../Controller');

const MemberDAO = require('../../DAO/MemberDAO');

const MemberVO = require('../../VO/Member');



module.exports = class MemberChangeController extends Controller {
    constructor() {
        super();
        this.memberDAO = new MemberDAO()
    }

    get = async (req, res) => {
        const { memberId, memberPwd, newMemberPwd } = req.query
        if (!userId || !userPwd || memberPwd!=newUserPwd) {
            this.sendResponse(false, 400, {message:'요청이 잘못되었습니다. 입력값 확인 요망'}, res)
            return
        }

        const info = await this.memberDAO.modifyMemberPassword(userId, userPwd)

        if (info) {
            this.sendResponse(true, 200, {message:'비밀번호 변경 성공'}, res);
        } else {
            this.sendResponse(false, 404, {message:'비밀번호 변경 실패'}, res)
        }
    }

}