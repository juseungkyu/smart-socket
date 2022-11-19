const Controller = require('../Controller');

const MemberDAO = require('../../DAO/MemberDAO');

const MemberVO = require('../../VO/Member');

module.exports = class MemberCreateController extends Controller {
    constructor() {
        super();
        
        this.MemberDAO = new this.MemberDAO()

        MemberDAO.getMember(memberId);
    }

    get = async (req, res)=>{
        console.log(req.params)
    }
    
}