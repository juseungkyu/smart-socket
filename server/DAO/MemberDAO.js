const DAO = require('./DAO')

module.exports = class extends DAO {
  constructor() {
    super()
  }

  //사용자 가져오는 함수
  getMember(memberId) {
    const result = {}
    const sql = 'select * from member where memberid=?';
    const data = [memberId]
    const isSuccess = this.run(sql, data, result)

    return {
      isSuccess,
      result: result.dbResult
    }
  }

  // 사용자 추가함수
  // 성공시 true, 실패시 false로 리턴.
  createMember(memberId, memberPwd, memberName) {
    const result = {}
    const sql = 'insert into member set ?';
    const data = { memberId, memberPwd, memberName}
    
    const isSuccess = this.run(sql, data, result)

    return {
      isSuccess,
      result: result.dbResult
    }
  }

  //사용자 비밀번호 변경함수
  // true, false로 반환.
  modifyMemberPassword(memberId, memberPwd) {
    try {
      con.getConnection(function (err, connection) {
        if (err) {
          console.error("err : " + err);
          return next(err);
        }
        let sql = 'update member set memberpwd=? where memberid=?';
        let data = [memberPwd, memberId]
        connection.query(sql, data, function (err) {
          if (err) {
            console.error("err : " + err);
            return next(err);
          }

          req.db_result = rows;
          connection.release();

          next();
        })
      })
      return true
    } catch (err) {
      exception.addThrow(new Exception(ErrorCode, err.message))
      return false
    }
  }

  // 사용자 삭제 함수
  // true, false로 반환.
  deleteMember(memberId) {
    const result = {}
    const sql = 'delete member where memberid=?';
    const data = { memberId, memberPwd, memberName}
    
    const isSuccess = this.run(sql, data, result)

    return {
      isSuccess,
      result: result.dbResult
    }
  }
}
