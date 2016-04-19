var socket = io.connect();
var name = prompt("What is your name?");
var room = 'Instant Barbarians';
    
$(document).ready(function() {
    
    //adding users to the active user list
    socket.on('connect', function() {
         $("#userlist").append($('<li>').text(name))
    })
    
    //send the name from the prompt to the server
    socket.emit('join', name);
    
    socket.emit('typing', name);
    
     //append to the chat log the name of the user that joined
    socket.on('new user', function(user) {
        $("#messages").append($('<li>').text(user));
    });
    
    socket.on('typing', function(data) {
        $("#messages").append($('<li>').text(data));
    })
    
    $("form").submit(function(){
        //this creates the chat message event with the value of #m as the data
        socket.emit('chat message', $('#m').val());
        //this resets value of the chat message input to empty
        $('#m').val('');
        return false;
    });
    
    //append to the chat log a user's chats
    socket.on('chat message', function(msg){
        $("#messages").append($('<li>').text(msg));
    });
    
    // send to the server the name of the user that left the chat
    socket.emit('disconnect', name);
    // add to the chat log the name of the user that left
    socket.on('disconnect', function(user) {
        $("#messages").append($('<li>').text(user));
    });
});
    
