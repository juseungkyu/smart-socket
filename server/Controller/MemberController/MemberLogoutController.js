const Controller = require('../Controller');

const MemberDAO = require('../../DAO/MemberDAO');

const MemberVO = require('../../VO/Member');

module.exports = class MemberLogoutController extends Controller {
    constructor() {
        super();
        
        this.MemberDAO = new MemberDAO()
    }

    get = async (req, res) => {
        const { userId, userPwd } = req.query
        if (!userId || !userPwd) {
            this.sendResponse(false, 400, {message:'bad request'}, res);
            return
        }

        const info = await this.MemberDAO.MemberCreateController(userId, userPwd)

        if (info) {
            this.sendSuccess(200, info, res)
        } else {
            this.sendFailure(404, 'not found', res)
        }
    }
    
    
}