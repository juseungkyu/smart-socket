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

        //임시
        const info = true

        if (info) {
            this.sendResponse(true, 200, {message:'로그아웃 성공'}, res);
        } else {
            this.sendResponse(false, 404, {message:'로그아웃 실패'}, res)
        }
    }
    
    
}