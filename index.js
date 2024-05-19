const express = require('express');
const { createServer } = require('node:http');
// const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());

app.use(express.static("public"))
app.set('view engine', 'ejs');
app.set('views', "views")

io.on("connection", function(client){
    console.log("connecting to server");
    var room;
    client.on("join", function(msg){
        room = msg;
        client.join(room);
        // console.log("message: " + msg);
        // io.emit("chat message", msg);
    });
    client.on("message", function(msg){
        console.log("message: " + msg);
        io.to(room).emit("thread", msg);
    });
    
})

// app.get('/', (req, res) => {
//   res.sendFile(join(__dirname, 'index.html'));
// });

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

app.get('/chat', (req, res) => {
    return res.render('chat.ejs')
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});