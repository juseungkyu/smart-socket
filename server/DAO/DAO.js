const dbConn = require('../DB/dbConn');

const con = dbConn.getPool();

module.exports = class DAO {
    async run(sql, data, result) {
        console.log('run:', result)
        try {
            con.getConnection((err, connection) => {
                if (err) {
                    console.error("err : " + err);
                    return;
                }

                connection.query(sql, data, (err, rows) => {
                    if (err) {
                        console.error("err : " + err);
                        return err;
                    }
                    result.dbResult = rows;
                    console.log('query function:', result)
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