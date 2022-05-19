const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const systemBot = 'systemAI'

// Run for client
io.on('connection', socket => {
    // Saying hello to user
    socket.emit('message', formatMessage( systemBot ,'Hello, welcome to iChat'));

     // Broadcast when a user connects
     socket.broadcast.emit('message', formatMessage( systemBot , 'A user has entered the room'));

     // When client disconnects
     socket.on('disconnect', () => {
         io.emit('message', formatMessage( systemBot , 'A user has left the room'));
     });

     // Listen for chatMsg
     socket.on('chatMessage', msg => {
         io.emit('message', formatMessage('USER' , msg));
     });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log( `Server running on port ${PORT}`));