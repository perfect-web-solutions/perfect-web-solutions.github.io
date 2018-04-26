const socket = io();
let username = document.getElementById('txt-name');
let message = document.getElementById('txt-message');
let btn = document.getElementById('btn-chat');
let feedback = document.getElementById('feedback');
btn.addEventListener('click', function(){
    socket.emit('chat-message', {
        username: username.value,
        message: message.value,
    })
})
message.addEventListener('keyup', function(){
    socket.emit('typing', username.value);
})
socket.on('chat-message', function(data){
    feedback.innerText = '';
    let chatWin = document.getElementById('chat-window');
    let msg = '<div class="row msg_container base_receive"><div class="col-md-2 col-xs-2 avatar"><strong>'+data.username+'</strong>\
    </div><div class="col-md-10 col-xs-10"><div class="messages msg_receive"><p>'+data.message+'</p></div></div></div>';
   chatWin.innerHTML += msg;
})
socket.on('typing', function(username){
    feedback.innerText = username + " is typing...";
})