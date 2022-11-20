const Controller = require('../Controller');

const MemberDAO = require('../../DAO/MemberDAO');

const MemberVO = require('../../VO/Member');

module.exports = class MemberChangeController extends Controller {
    constructor() {
        super();
        this.MemberDAO = new this.MemberDAO()
    }

    get = async (req, res) => {
        const { userId, userPwd, newUserPwd } = req.query
        if (!userId || !userPwd || userPwd!=newUserPwd) {
            this.sendFailure(400, 'bad request', res)
            return
        }

        const info = await this.MemberDAO.modifyMemberPassword(userId, userPwd)

        if (info) {
            this.sendSuccess(200, info, res)
        } else {
            this.sendFailure(404, 'not found', res)
        }
    }

}