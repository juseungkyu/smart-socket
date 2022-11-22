const Controller = require('../Controller');

const MemberDAO = require('../../DAO/MemberDAO');

const MemberVO = require('../../VO/Member');

module.exports = class MemberLogoutController extends Controller {
    constructor() {
        super();
        
        this.MemberDAO = new MemberDAO()
    }

    get = async (req, res) => {

        //임시
        let info = false;
        
        try {
            res.clearCookie('member_id');
            req.session.destroy(function(){
                req.session;
            }); 
            info = true;
          } catch (error) {
            console.log(error);
          }
          
        if (info) {
            this.sendResponse(true, 200, {message:'로그아웃 성공'}, res);
        } else {
            this.sendResponse(false, 404, {message:'로그아웃 실패'}, res)
        }
    }
    
    
}