const mongoose = require('mongoose')

mongoose.connect('')

let chatschema = new mongoose.Schema({
    sno: {type:Number,default:0},
    username: {type:String, required:true},
    message:{type:String,required:true},
    date: {type:Date,default:Date.now()}
})

let Chats = mongoose.model('chats',chatschema)

async function InsertnewChat(username,message){
    await Chats.create({
        username: username,
        message:message
    })
    // let data = await Chats.findOne(username,message)
    // console.log(data)
}



async function Getchats(req,res){
    // let tobeskip = req.body.tobeskip
    let count = await Chats.countDocuments()
    let skip = count - 20
    let chats = await Chats.find({}).skip(skip >= 0 ? skip : 0).limit(100)
    res.json(chats)
}


module.exports = {InsertnewChat,Getchats}