const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()
const secret_key = process.env.secret_key

mongoose.connect('')

const Userschema = new mongoose.Schema({
    username: {type:String, required: true},
    password: {type:String, required: true},
    email: {
        type: String,
        unique: true,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.model('chatusers', Userschema)

async function InsertUser(req,res){
    const entry = req.body;

    if (entry) {
        try {
            await User.create({
                username: entry.username,
                password: entry.password,
                email: entry.email
            });
            return res.status(201).redirect('/login');
        } catch (error) {
            if (error.code === 11000) {
                return res.status(409).send("<h1>Email already exits</h1>");
            } else {
                return res.status(500).send({ error: "An error occurred while creating the user" });
            }
        }
    } else {
        return res.status(400).send({ error: "Invalid entry data" });
    }

        }
    


async function getUser(req,res){
    const {email,password} = req.body
    const user = await User.findOne({email,password})
    if (!user){
        res.send("Incorrect email or password")
        return
    }
    const token = jwt.sign({
        "email":user.email
    },secret_key)
    res.cookie('uid',token,{
        maxAge: 2592000000,
    })
    res.cookie('username',user.username,{
        maxAge: 2592000000,
    })
    res.redirect('/chatpage')
}

module.exports = {getUser,InsertUser}