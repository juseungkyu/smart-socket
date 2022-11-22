const dotenv = require("dotenv");
dotenv.config();
const express = require('express')
const app = express()
const path = require('path')
const MemberDAO = require('./DAO/MemberDAO')
const apiRouter = require('./routers')
const session = require('express-session');
const cookieParser = require('cookie-parser')
const { MemoryStore } = require("express-session");

let maxAge = 5*60*1000

console.log("DB_HOST:", process.env.HOST);
console.log("DB_USER:", process.env.USER);
console.log("DB_PASS:", process.env.PASSWORD);

async function test() {
    const returnData = await new MemberDAO().getMember('hi')
    const { isSuccess, result } = returnData
    console.log(result)
}

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    store:new MemoryStore({checkPeriod:maxAge}),
    cookie:{
        maxAge:maxAge
    }
}))
test()

app.use(cookieParser())

app.listen(3001, () => {
    console.log('server running')
})

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use('/api', apiRouter)

// 리엑트 앱 연결
const reactPath = path.join(__dirname, 'react-app/build/index.html')
console.log(reactPath)
app.use(express.static(path.join(__dirname, 'react-app/build/')))

app.get('/', (req, res) => {
    res.render('index', { data: req.db_result });
    res.sendFile(reactPath)
})

app.get('*', (req, res) => {
    res.sendFile(reactPath)
})