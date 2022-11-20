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
            this.sendResponse(false, 400, 'bad request', res)
            return
        }

        const info = await this.MemberDAO.modifyMemberPassword(userId, userPwd)

        if (info) {
            this.sendResponse(true, 200, info, res)
        } else {
            this.sendFailure(404, 'not found', res)
            this.sendResponse(false, 404, 'not found', res)
        }
    }

}