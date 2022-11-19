const dotenv = require("dotenv");
dotenv.config();
const express = require('express')
const app = express()
const path = require('path')

console.log("DB_HOST:", process.env.HOST);
console.log("DB_USER:", process.env.USER);
console.log("DB_PASS:", process.env.PASSWORD);


const MemberDAO = require('./DAO/MemberDAO')

app.listen(3001, ()=>{
    console.log('server running')
})

console.log(new MemberDAO().getMember('hi'))

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