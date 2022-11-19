const dotenv = require("dotenv");
dotenv.config();
const express = require('express')
const app = express()
const path = require('path')
const dbConn = require('./db/dbConn')
const MemberDAO = require('./DAO/MemberDAO')

console.log("DB_HOST:", process.env.HOST);
console.log("DB_USER:", process.env.USER);
console.log("DB_PASS:", process.env.PASSWORD);

async function start() {
    console.log(await new MemberDAO().getMember('hi'))
}

start()

app.listen(3001, ()=>{
    console.log('server running')
})

// const reactPath = path.join(__dirname, 'react-app/build/index.html') 
// console.log(reactPath)
// app.use(express.static(path.join(__dirname, 'react-app/build/')))

// app.get('/', (req, res)=>{
//     res.render('index', { data: req.db_result });
//     res.sendFile(reactPath)
// })

// app.get('*', (req, res)=> {
//     res.sendFile(reactPath)
// })