const express = require('express')
const app = express()
const path = require('path')

const oracledb = require('oracledb')

app.listen(3001, ()=>{
    console.log('server running')
})

const reactPath = path.join(__dirname, 'react-app/build/index.html') 
console.log(reactPath)
app.use(express.static(path.join(__dirname, 'react-app/build/')))

app.get('/', (req, res)=>{
    res.sendFile(reactPath)
})

app.get('*', (req, res)=> {
    res.sendFile(reactPath)
})