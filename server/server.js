const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const RPSGame = require('./rps-game-logic');
const clientPath = __dirname.substring(0, __dirname.lastIndexOf('\\'))+"\\client";
var port = 8080;

console.log("Serving static from "+clientPath);

const app = express();
app.use(express.static(clientPath));  

const server = http.createServer(app);

const io = socketio(server);
//controllo se c'è qualcuno che aspetta un match
let waitingPlayer = null;

io.on('connection', (socket) => {
    //inizio il gioco se c'è un avversario libero
  if(waitingPlayer){
    new RPSGame(waitingPlayer, socket);
    waitingPlayer=null;
  }
    //messa in attesa se è l'unico libero
  else{
    waitingPlayer = socket;
    waitingPlayer.emit('message', "Waiting for an opponent");
  }
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