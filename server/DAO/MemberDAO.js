const db = require('../DB/dbConn')
const exception = require('../Exception')

const con = dbcon.getPool();

module.exports = class {

  //사용자 가져오는 함수
  getMember(memberId) {
    try {
      con.getConnection(function (err, connection) {
        if (err) {
          console.error("err : " + err);
          return next(err);
        }
        sql = 'select * from member where memberid=?';
        connection.query(sql, memberId, function (err, rows) {
          if (err) {
            console.error("err : " + err);
            return next(err);
          }
          console.log("rows : " + JSON.stringify(rows));

          req.db_result = rows;
          connection.release();

          next();
        })
      })
      return rows
    } catch (err) {
      exception.addThrow(new Exception(ErrorCode, err.message))
      return null
    }
  }

  // 사용자 추가함수
  // 성공시 true, 실패시 false로 리턴.
  createMember = async (memberId, memberPwd, memberName) => {
    try {
      con.getConnection(function (err, connection) {
        if (err) {
          console.error("err : " + err);
          return next(err);
        }
        let sql = 'insert into member set ?';
        let data = { memberId: memberId, memberPwd: memberPwd, memberName: memberName }
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
    try {
      con.getConnection(function (err, connection) {
        if (err) {
          console.error("err : " + err);
          return next(err);
        }
        sql = 'delete member where memberid=?';
        connection.query(sql, memberId, function (err) {
          if (err) {
            console.error("err : " + err);
            return next(err);
          }

          req.db_result = rows;
          connection.release();

          next();
        })
      })
      return true;
    } catch (err) {
      exception.addThrow(new Exception(ErrorCode, err.message))
      return false;
    }
  }

}
