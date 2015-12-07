var http = require('http')
var express = require('express')
var socketio = require('socket.io')

var app = express()
app.use(express.static('public'))

var server = http.Server(app)
var io = socketio(server)

io.on('connection', function(socket) {

    socket.on('draw', function(position) {
        console.log('draw emitted')
		socket.broadcast.emit('draw', position)
	})

	socket.on('joined', function(name) {
        console.log('new user joined')
	})

	socket.on('disconnect', function() {
        console.log('user disconnected')
	})
})

server.listen(9000)
