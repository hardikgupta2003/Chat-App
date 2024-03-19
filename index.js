const http = require("http");
const express = require("express");
const path =  require('path');

const app = express();
const server = http.createServer(app);

const {Server} = require("socket.io")
const io = new Server(server);

// Socket.io 
io.on("connection",(socket)=>{
    socket.on("user-message", (message)=>{
      io.emit("message",message); //send message to all users connected
    })
})

app.use(express.static(path.resolve("./public")))



app.get('/', (req, res) => {
    console.log('Received request chatting application /');
    return res.sendFile('./public/index.html')

})

server.listen(9000, () => console.log(`Server Started at PORT: 9000`));