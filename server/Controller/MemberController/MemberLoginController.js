const Controller = require('../Controller');
const MemberDAO = require('../../DAO/MemberDAO');
const MemberVO = require('../../VO/Member');


module.exports = class MemberLoginController extends Controller {
    constructor() {
        super();

        this.memberDAO = new MemberDAO()
    }

    // 로그인
    post = async (req, res) => {
        // 올바른 요청인지 검사
        const { memberId, memberPw } = req.body
        if (!memberId || !memberPw) {
            this.sendResponse(false, 400, { message: '요청이 잘못되었습니다.' }, res);
            return
        }

        // 회원 조회
        const { result, isSuccess } = await this.memberDAO.loginMember(memberId, memberPw)

        if (isSuccess) {
            // 로그인 성공시 쿠키 생성
            res.cookie('member_id', result[0].member_id, {
                maxAge: 60 * 60 * 1000,
                path: "/"
            });
            res.cookie('is_admin', result[0].is_admin, {
                maxAge: 60 * 60 * 1000,
                path: "/"
            });
            
            // 세션 생성
            req.session.member_id = result[0].member_id;

            this.sendResponse(true, 200, { message: '로그인 성공' }, res);
        } else {
            this.sendResponse(false, 404, { message: '유저 정보 확인 실패' }, res);
        }
    }

}