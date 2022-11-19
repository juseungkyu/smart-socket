const Controller = require('../Controller');

const MemberDAO = require('../../DAO/MemberDAO');

const MemberVO = require('../../VO/Member');

module.exports = class MemberChangeController extends Controller {
    constructor() {
        super();
        this.MemberDAO = new this.MemberDAO()
    }

    get = async (req, res)=>{
        this.MemberDAO.
        console.log(req.params)
    }
    
}