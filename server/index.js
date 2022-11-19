const express = require('express')
const app = express()
const path = require('path')

const mysql = require('mysql')

app.listen(3001, ()=>{
    console.log('server running')
})

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