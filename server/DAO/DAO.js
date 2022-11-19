const dbConn = require('../DB/dbConn')
const exception = require('../Exception')

const con = dbConn.getPool();

module.exports = class DAO {
    run(sql, data, result) {
        try {
            con.getConnection((err, connection) => {
                if (err) {
                    console.error("err : " + err);
                    exception.addThrow(new Exception(ErrorCode, err.message))
                    return;
                }

                connection.query(sql, data, function (err, rows) {
                    if (err) {
                        console.error("err : " + err);
                        exception.addThrow(new Exception(ErrorCode, err.message))
                        return err;
                    }

                    result.dbResult = rows;
                    connection.release();
                })
            })

            return true
        } catch (err) {
            exception.addThrow(new Exception(ErrorCode, err.message))
            return false
        }
    }
}