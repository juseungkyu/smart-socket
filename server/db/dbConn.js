//mysql 사용하기
require('dotenv').config({ path: "../.env" });

const mysql = require("mysql");
console.log(process.env.HOST)
const dbConfig = {
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USERS,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: 10,
    waitForConnections: false,
    multipleStatements: true
};


// const dbConfig = {
//     host: 'pukkuk.pp.ua',
//     port: 15000,
//     user: 'root',
//     password: 'jeongsumin0701!',
//     database: 'yydh',
//     connectionLimit: 10,
//     waitForConnections: false,
//     multipleStatements: true
// };

function getPool() {
    const pool = mysql.createPool(dbConfig);
    return pool;
}

module.exports.getPool = getPool;