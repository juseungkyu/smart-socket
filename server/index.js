const dotenv = require("dotenv");
dotenv.config();
const express = require('express')
const app = express()
const path = require('path')
const MemberDAO = require('./DAO/MemberDAO')
const apiRouter = require('./routers')

console.log("DB_HOST:", process.env.HOST);
console.log("DB_USER:", process.env.USER);
console.log("DB_PASS:", process.env.PASSWORD);

async function start() {
    const returnData = await new MemberDAO().getMember('hi')
    const {isSuccess, result} = returnData

    console.log(result[0])
    console.log(result[0].member_id)
}

start()

app.listen(3001, ()=>{
    console.log('server running')
})

app.use('/api', apiRouter)

// 리엑트 앱 연결
const reactPath = path.join(__dirname, 'react-app/build/index.html') 
console.log(reactPath)
app.use(express.static(path.join(__dirname, 'react-app/build/')))

app.get('/', (req, res)=>{
    res.render('index', { data: req.db_result });
    res.sendFile(reactPath)
})

app.get('*', (req, res)=> {
    res.sendFile(reactPath)
})