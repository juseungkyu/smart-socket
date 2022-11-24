const dotenv = require("dotenv");
dotenv.config();
const express = require('express')
const app = express()
const path = require('path')
const MemberDAO = require('./DAO/MemberDAO')
const DeviceDAO = require('./DAO/DeviceDAO')
const apiRouter = require('./routers')
const session = require('express-session');
const cookieParser = require('cookie-parser')
const { MemoryStore } = require("express-session");
const { setTimeout } = require("timers/promises");

let maxAge = 5*60*1000

console.log("DB_HOST:", process.env.HOST);
console.log("DB_USER:", process.env.USER);
console.log("DB_PASS:", process.env.PASSWORD);

// 세션 설정
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    store:new MemoryStore({checkPeriod:maxAge}),
    cookie:{
        maxAge:maxAge
    }
}))

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
    res.sendFile(reactPath)
})

app.get('*', (req, res) => {
    res.sendFile(reactPath)
})



// 디바이스 연결 상태 초기 설정

const deviceTimerMap = new Map()
app.set('deviceTimerMap', deviceTimerMap)

async function initDeviceConnect() {
    const deviceDAO = new DeviceDAO()
    const {isSuccess, result} = await deviceDAO.getAllDevice()
    
    if(!isSuccess){
        return
    }

    for(let device of result) {
        const {deviceId} = device
        const timer = setTimeout(()=>{
            deviceDAO.changeDeviceConnect(deviceId, 0)
        }, 5)
        deviceTimerMap.set(deviceId, timer)
    }
}

initDeviceConnect()