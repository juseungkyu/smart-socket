const Controller = require('../Controller');
const MemberDAO = require('../../DAO/MemberDAO');
const MemberVO = require('../../VO/Member');


module.exports = class MemberLoginController extends Controller {
    constructor() {
        super();

        this.memberDAO = new MemberDAO()
    }

    post = async (req, res) => {
        const { memberId, memberPw } = req.body
        if (!memberId || !memberPw) {
            this.sendResponse(false, 400, { message: 'bad request' }, res);
            return
        }

        const { result, isSuccess } = await this.memberDAO.loginMember(memberId, memberPw)

        if (isSuccess) {
            // 로그인 성공시 쿠키 생성
            res.cookie('member_id', result.member_id, {
                maxAge: 60 * 60 * 1000,
                path: "/"
            });
            
            req.session.member_id = result.member_id;

            this.sendResponse(true, 200, { message: '로그인 성공' }, res);
        } else {
            this.sendResponse(false, 404, { message: '유저 정보 확인 실패' }, res);
        }
    }

}