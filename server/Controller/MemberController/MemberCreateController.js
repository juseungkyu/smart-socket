const Controller = require('../Controller');

const DeviceDAO = require('../../DAO/MemberDAO');

const MemberVO = require('../../VO/Member');

module.exports = class MemberCreateController extends Controller {
    constructor() {
        super();
        
        this.MemberDAO = new this.MemberDAO()
    }

    get = async (req, res)=>{
        console.log(req.params)
    }
    
}