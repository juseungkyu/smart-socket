const dbConn = require('../DB/dbConn');

const con = dbConn.getPool();

module.exports = class DAO {
    run(sql, data, result) {
        let res = []
        try {
            con.getConnection((err, connection) => {
                if (err) {
                    console.error("err : " + err);
                    return;
                }

                var exec = connection.query(sql, data, function (err, rows) {
                    if (err) {
                        console.error("err : " + err);
                        return err;
                    }
                    console.log('실행 대상 SQL: ' + exec.sql)
                    console.log(rows)
                    result.dbResult = rows;
                    connection.release();
                    
                })
            })
            
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }
}