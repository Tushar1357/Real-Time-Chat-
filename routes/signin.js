const express = require('express')
const {getUser,InsertUser} = require('../controllers/signuporauth')

const router = express.Router()


router.post('/signup',InsertUser)

router.post('/signin',getUser)

module.exports = router