//mysql 사용하기
const dotenv = require('dotenv').config();
const { env } = require("process");

const mysql = require("mysql");
const dbConfig = {
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    connectionLimit:10,
    waitForConnections:false,
    multipleStatements: true
  };


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