const express = require('express')
const staticrouter = require('./routes/staticroute')
const path = require('path')
const bodyParser = require('body-parser');
const signinrouter = require('./routes/signin')
const chatrouter = require('./routes/chatroute')
const cookieparser = require('cookie-parser')
const socketio = require('socket.io')
const http = require('http')
const {InsertnewChat} = require('./controllers/chats')
const cors = require('cors');



const port = 3000;

const app = express()

const httpServer = http.createServer(app)

const io = socketio(httpServer)

io.on('connection',(socket)=>{
    console.log("A user connected")

    socket.on('new_message',(username,message)=>{
        InsertnewChat(username,message)
        socket.broadcast.emit('other_message',username,message)
    })

    socket.on('disconnect',()=>{
        console.log("User disconnected")
    })
})

app.use(express.urlencoded());
app.use(express.json());
app.use(cookieparser())
const corsOptions = {
    origin: 'http://localhost:3000/',
    credentials: true 
};

app.use(cors(corsOptions));

app.use('/',express.static(path.join(__dirname,'public')))
app.use('/node_modules',express.static(path.join(__dirname,'node_modules')))


app.use('/',chatrouter)
app.use('/',staticrouter)
app.use('/',signinrouter)

httpServer.listen(port,()=>{
    console.log(`Server listening to port : ${port}`)
})


