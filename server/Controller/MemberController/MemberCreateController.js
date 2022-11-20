const Controller = require('../Controller');

const MemberDAO = require('../../DAO/MemberDAO');

const MemberVO = require('../../VO/Member');

module.exports = class MemberCreateController extends Controller {
    constructor() {
        super();
        
        this.MemberDAO = new this.MemberDAO()

        MemberDAO.getMember(memberId);
    }

    get = async (req, res) => {
        const { userId, userPwd, memberName } = req.query
        if (!userId || !userPwd || !memberName) {
            this.sendFailure(400, 'bad request', res)
            return
        }

        const info = await this.MemberDAO.createMember(userId, userPwd, memberName)

        if (info) {
            this.sendSuccess(200, info, res)
        } else {
            this.sendFailure(404, 'not found', res)
        }
    }
    
}