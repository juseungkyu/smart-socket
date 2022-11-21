const dbConn = require('../db/dbConn');

module.exports = class DAO {
    async run(sql, data, result) {
        try {
            const con = await dbConn.getConnection()

            const dbResult = await con.query(sql, data)
            result.dbResult = dbResult

            await con.commit()
            con.connection.release();
            return true
        } catch (error) {
            console.log('db error:', error)
            console.log('sql:', sql)
            return false
        }
    }
}