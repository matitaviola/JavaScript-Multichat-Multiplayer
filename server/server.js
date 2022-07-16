const http = require('http');
var port = 8080;
const express = require('express');
const socketio = require('socket.io');

const clientPath = __dirname.substring(0, __dirname.lastIndexOf('\\'))+"\\client";
console.log("Serving static from "+clientPath);

const app = express();
//app.use(express.static(clientPath));
app.use(express.static(clientPath));  

const server = http.createServer(app);

const io = socketio(server);
io.on('connection', (socket) => {
    console.log('Someone connected');
    socket.emit('message', 'Hi, you are connected');
  
    //ricevo i msg e li stampo
    socket.on('message', (msg) => {
        //uso io.emit invece di socket.emit perchè socket manderebbe ad un solo destinatario
        //io lo invia a tutti, incluso chi lo invia
      io.emit('message', msg);
    });
  });

server.listen(port, ()=>{
    console.log('RPS started on 8080');
});

server.on('error', (err)=>{
    console.log('Server error:', err);
});