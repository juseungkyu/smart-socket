const Controller = require('../Controller');

const MemberDAO = require('../../DAO/MemberDAO');

const MemberVO = require('../../VO/Member');

module.exports = class MemberCreateController extends Controller {
    constructor() {
        super();
        
        this.MemberDAO = new this.MemberDAO()
    }

    get = async (req, res) => {
        const { memberId, memberPwd } = req.query
        if (!userId || !memberPwd ) {
            this.sendFailure(400, 'bad request', res)
            return
        }

        const info = await this.MemberDAO.createMember(userId, userPwd)

        if (info) {
            this.sendSuccess(200, info, res)
        } else {
            this.sendFailure(404, 'not found', res)
        }
    }
    
}