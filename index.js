const express = require('express');
const http = require('http');
const socket = require('socket.io');
const cors = require('cors');
const app = express();

app.use(express.static('public'));
app.use(cors());
//const server = app.listen(4000, ()=> console.log("Listening at http://localhost:4000"));
const server = app.listen(process.env.PORT || 3000, function(){
  console.log('listening on', app.address().port);
});
const io = socket(server);
io.on('connection', socket =>{
    console.log("Connected on Socket with ID: "+socket.id);
    socket.on('chat-message', function(data){
        console.log(data);
        io.sockets.emit('chat-message', data);
    })
    socket.on('typing', username => {
        console.log(username);
        socket.broadcast.emit('typing', username);
    })
})
