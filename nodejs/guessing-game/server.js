var http = require('http')
var express = require('express')
var socketio = require('socket.io')

var app = express()
app.use(express.static('public'))

var server = http.Server(app)
var io = socketio(server)

io.on('connection', function(socket) {

    console.log('connected')

    function handleGuess(guess){
        console.log(guess)
        socket.broadcast.emit('newguess', guess)
    }

    function handleDisconnect() {
        console.log('A user has disconnected');
    }

    socket.on('disconnect', handleDisconnect);
    socket.on('guess', handleGuess)

})

server.listen(9001)
