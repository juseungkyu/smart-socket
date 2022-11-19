//mysql 사용하기
const dotenv = require('dotenv').config();
const { env } = require("process");

const mysql = require("mysql");
const dbConfig = {
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    connectionLimit: 10,
    waitForConnections: false,
    multipleStatements: true
};


function createPool(next) {
    pool = dbConfig
    next()
}
function getPool() {
    return pool;
}

module.exports.createPool = createPool;
module.exports.getPool = getPool;