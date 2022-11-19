const db = require('../DB/dbConn')
const exception = require('../Exception')

const con = dbcon.getPool();

module.exports = class {
  async getMember(memberId) {
    try {
      con.getConnection(function (err, connection){
        if (err) {
          console.error("err : " + err);
          return next(err);
        }
        sql = 'select * from member where memberid='+memberId;
        connection.query(sql, function (err, rows) {
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
    } catch (err) {
      exception.addThrow(new Exception(ErrorCode, err.message))
      return null
    }
  }

  // 멤버 추가함수
  createMember = async (memberId, memberPwd, memberName) => {
    try {
      con.getConnection(function (err, connection){
        if (err) {
          console.error("err : " + err);
          return next(err);
        }
        sql = 'insert into from member values("'+memberId+'","'+memberPwd+'","'+memberName+"'";
        connection.query(sql, function (err) {
          if (err) {
            console.error("err : " + err);
            return next(err);
          }

          req.db_result = rows;
          connection.release();
    
          next();
        })
      })
    } catch (err) {
      exception.addThrow(new Exception(ErrorCode, err.message))
      return null
    }
  }

  // 관리자가 유저를 영원히 삭제하고 싶을때 쓰는 함수
  async deleteClassForever(classId) {
    try {
      return (
        (await Class.destroy({
          where: { classId },
        })) !== null
      )
    } catch (err) {
      exception.addThrow(new Exception(ErrorCode, err.message))
      return false
    }
  }

}
