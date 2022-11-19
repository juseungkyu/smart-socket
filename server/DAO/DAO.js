const dbConn = require('../DB/dbConn')

const con = dbConn.getPool();

module.exports = class DAO {
    run(sql, data, result) {
        try {
            con.getConnection((err, connection) => {
                if (err) {
                    console.error("err : " + err);
                    return;
                }

                connection.query(sql, data, function (err, rows) {
                    if (err) {
                        console.error("err : " + err);
                        return err;
                    }

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