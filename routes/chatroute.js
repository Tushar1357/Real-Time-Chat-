const express = require('express')
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const {Getchats} = require('../controllers/chats')

dotenv.config()
const secret_key = process.env.secret_key

const router = express.Router()
let content = fs.readFileSync(path.join(__dirname,'../public/chatPage.html'),'utf-8')


router.get('/',(req,res)=>{
    res.redirect('/chatpage')
})


function restrictlogin(req,res,next){
    let cookie = req.cookies.uid
    try{
        jwt.verify(cookie,secret_key)
        next()
    }
    catch{
        res.redirect('/login')
    }
}

router.get('/chatpage',restrictlogin,(req,res)=>{
    res.end(content)
})

router.get('/getchats',restrictlogin,Getchats)


module.exports = router