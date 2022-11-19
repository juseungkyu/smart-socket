//mysql 사용하기
const dotenv = require('dotenv').config();
const { env } = require("process");
const mysql = require("promise-mysql");

const dbConfig = {
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: 10,
    waitForConnections: false,
    multipleStatements: true
};

const pool = mysql.createPool(dbConfig);

async function getConnection() {
    return await (await pool).getConnection();
}

module.exports.getConnection = getConnection;