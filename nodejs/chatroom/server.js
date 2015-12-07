var socketio = require('socket.io')
var http = require('http')
var express = require('express')

var app = express()
app.use(express.static('public'))

var server = http.Server(app)
var io = socketio(server)

io.on('connection', function(socket) {
	console.log('Client connected')
    socket.broadcast.emit('connectcount', io.sockets.sockets.length -1)

    socket.on('message', function(message) {
		console.log('Received message:', message);
		socket.broadcast.emit('message', message);
	})

	socket.on('joined', function(name) {
		socket.name = name
		console.log(name + " joined");
		socket.broadcast.emit('joined', name + " joined");
        socket.broadcast.emit('connectcount', io.sockets.sockets.length)
	})

	socket.on('disconnect', function() {
        console.log(socket.name, '- disconnected');
		socket.broadcast.emit('disconnected', socket.name);
        socket.broadcast.emit('connectcount', io.sockets.sockets.length)

	});
});

server.listen(8000)
