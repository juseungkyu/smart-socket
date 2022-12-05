const Controller = require('../Controller');

const MemberDAO = require('../../DAO/MemberDAO');

const MemberVO = require('../../VO/Member');

module.exports = class MemberLogoutController extends Controller {
    constructor() {
        super();

        this.MemberDAO = new MemberDAO()
    }

    // 로그아웃
    get = async (req, res) => {
        let info = false;

        try {
            // 쿠키, 세션 삭제
            res.clearCookie('member_id');
            req.session.destroy(function (err) {
                if (err) throw err;
                req.session;
            });
            info = true;
        } catch (error) {
            console.log('로그아웃 실패:', error);
        }

        if (info) {
            this.sendResponse(true, 200, { message: '로그아웃 성공' }, res);
        } else {
            this.sendResponse(false, 404, { message: '로그아웃 실패' }, res)
        }
    }


}