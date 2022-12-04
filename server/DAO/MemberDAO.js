const DAO = require('./DAO')

module.exports = class extends DAO {
  constructor() {
    super()
  }

  /**
   * 멤버 조회
   * @param {String} memberId 조회할 멤버의 아이디
   * @returns Object {isSuccess, result} 가 반환됨.
   */
  async getMember(memberId) {
    const result = {}
    const sql = 'select * from member where member_id=?';
    const data = [memberId]
    const isSuccess = await this.run(sql, data, result)

    return {
      isSuccess,
      result: result.dbResult
    }
  }

  /**
   * 로그인 가능 확인 (isSuccess에 가능 여부)
   * @param {String} memberId 조회할 멤버의 아이디 
   * @param {String} memberId 조회할 멤버의 비밀번호 
   * @returns Object {isSuccess, result} 가 반환됨.
   */
  async loginMember(memberId, memberPwd) {
    const result = {}
    const sql = 'select * from member where member_id=? AND member_pw=?';
    const data = [memberId, memberPwd]
    const isSuccess = await this.run(sql, data, result)

    return {
      isSuccess,
      result: result.dbResult
    }
  }

  /**
   * 멤버 생성
   * @param {String} memberId 생성할 멤버의 아이디 
   * @param {String} memberId 생성할 멤버의 비밀번호 
   * @returns Object {isSuccess, result} 가 반환됨.
   */
  async createMember(memberId, memberPwd) {
    const result = {}
    const sql = 'insert into member set ?';
    const data = { 
      member_id: memberId, 
      member_pw: memberPwd
    }
    
    const isSuccess = await this.run(sql, data, result)

    return {
      isSuccess,
      result: result.dbResult
    }
  }
}
