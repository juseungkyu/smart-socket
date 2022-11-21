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

        if (result.code == 0) {
            // 로그인 성공시 쿠키 생성
            res.cookie('memberid', result.userid, {
                maxAge: 60 * 60 * 1000,
                path: "/"
            });

            
            req.session.user = result.userid;
        }



        if (isSuccess) {
            this.sendResponse(true, 200, { message: '로그인 성공' }, res);
        } else {
            this.sendResponse(false, 404, { message: '유저 정보 확인 실패' }, res);
        }
    }

}