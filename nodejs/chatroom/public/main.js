$(document).ready(function() {
    var socket = io()
    var input = $('input');
    var messages = $('#messages');
    var message = $('#message')
    var nickname = $('#nickname');
    var connectcount = $('#connectcount')

    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };

    var updateConnected = function(count){
        connectcount.text(count)
    }

    nickname.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }
        socket.emit('joined', nickname.val())
        nickname.hide()
        message.show()
    })

    message.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        var chatmessage = nickname.val() + ': ' + message.val();
        addMessage(chatmessage);
        socket.emit('message', chatmessage)
        message.val('');
    });
    socket.on('message', addMessage)
    socket.on('joined', addMessage)
    socket.on('connectcount', updateConnected)

});
