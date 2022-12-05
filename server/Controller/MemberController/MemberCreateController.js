const Controller = require('../Controller');
const MemberDAO = require('../../DAO/MemberDAO');
const MemberVO = require('../../VO/Member');



module.exports = class MemberCreateController extends Controller {
    constructor() {
        super();
        this.memberDAO = new MemberDAO()
    }

    /**
     * 회원가입 요청 수행
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    post = async (req, res) => {
        // 올바른 요청인지 검사
        const { memberId, memberPw } = req.body
        if (!memberId || !memberPw) {
            this.sendResponse(false, 400, {message:'요청이 잘못되었습니다.'}, res);
            return
        }

        // 회원가입
        const {info, isSuccess} = await this.memberDAO.createMember(memberId, memberPw)

        if (isSuccess) {
            this.sendResponse(true, 200, {message:'멤버 생성 성공'}, res);
        } else {
            this.sendResponse(false, 404, {message:'멤버 생성 실패'}, res)
        }
    }
    
}