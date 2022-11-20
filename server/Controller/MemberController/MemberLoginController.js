const Controller = require('../Controller');

const MemberDAO = require('../../DAO/MemberDAO');

const MemberVO = require('../../VO/Member');

module.exports = class MemberLoginController extends Controller {
    constructor() {
        super();
        
        this.MemberDAO = new this.MemberDAO()
    }

    get = async (req, res) => {
        const { userId, userPwd } = req.query
        if (!userId || !userPwd) {
            this.sendFailure(400, 'bad request', res)
            return
        }

        const info = await this.MemberDAO.loginMember(userId, userPwd)

        if (info) {
            this.sendSuccess(200, info, res)
        } else {
            this.sendFailure(404, 'not found', res)
        }
    }
    
}