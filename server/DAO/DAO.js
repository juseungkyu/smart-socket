const dbConn = require('../db/dbConn');

module.exports = class DAO {
    /**
     * SQL 실행
     * 결과 성공 여부는 리턴하고 조회 결과가 있다면 매개변수로 넣은 result에 담아줌 
     * @param {String} sql 실행할 sql
     * @param {Array or Object} data 순서대로 array에 값 넣기 또는 set ? 문법으로 object에 값 넣어주기
     * @param {Object} result 결과값을 받을 object
     * @returns Boolean
     */
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