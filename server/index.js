const express = require('express')
const app = express()
const path = require('path')

const oracledb = require('oracledb')

app.listen(3001, ()=>{
    console.log('server running')
})

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'react-app/build/index.html'))
})

app.get('*', (req, res)=> {
    res.sendFile(path.join(__dirname, 'react-app/build/index.html'))
})