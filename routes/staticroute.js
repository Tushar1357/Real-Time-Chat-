const express = require('express')
const fs = require('fs')
const path = require('path')

const router = express.Router()



router.get('/login',(req,res)=>{
    let content = fs.readFileSync(path.join(__dirname,'../public/loginPage.html'),'utf-8')
    res.end(content)
})

router.get('/register',(req,res)=>{
    let content = fs.readFileSync(path.join(__dirname,'../public/signupPage.html'),'utf-8')
    res.end(content)
})


module.exports = router