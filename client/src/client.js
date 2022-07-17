const MaxRan = 1000;
const id = Math.floor(Math.random() * MaxRan);

const logEvent = (text)=>{
    //<ol> di index
    const parent = document.querySelector('#events');
    // <li> di index
    const element = document.createElement('li');
    element.innerHTML = text;
    parent.appendChild(element);
};

const formSubmission = (sub) =>{
    sub.preventDefault();
    const input = document.querySelector('#chat');
    //leggo il texto scritto e ripulisco il form
    const msg = "[Client_Id:"+id+"]: "+input.value;
    input.value = '';
    //invio il msg con il socket
    socket.emit('message', msg);
}
document.querySelector('#chat-form').addEventListener('submit',formSubmission);

const socket = io();
socket.on('message', logEvent)