const conn = require('../db/dbConn')
//const vo = require('../VO/Device')


function selectAll(req,res,next) {
    var con = conn.getPool();
    con.getConnection(function (err, connection){
      if (err) {
        console.error("err : " + err);
        return next(err);
      }
      var sql = 'select * from member'
      connection.query(sql, function (err, rows) {
        if (err) {
          console.error("err : " + err);
          return next(err);
        }
        console.log("rows : " + JSON.stringify(rows));
  
        req.db_result = rows;
        connection.release();
  
        next();
      });
    });
  }
  
  module.exports.selectAll = selectAll;