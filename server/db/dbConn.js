
//Oracle 사용하기

var mysql = require("mysql");
var dbConfig = require("./dbConfig");


module.exports = {
    init: function () {
        return mysql.createConnection(dbConfig);
    },
    connect: function (conn) {
        conn.connect(function (err) {
            if (err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected successfully!');
        });
    }
}