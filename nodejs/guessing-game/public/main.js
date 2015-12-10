function handleReady($){
    var $guess
    var $guessBox
    var socket = io()

    function handleNewGuess(guess){
        console.log(guess)
        var newmessage = $('<li>').text(guess)
        $guess.find('#newguess')[0].appendChild(newmessage[0])
    }

    function onKeyDown(event) {
        if (event.keyCode != 13) return

        var guess = 'guess: ' + $guessBox.val()
        socket.emit('guess', guess)

        handleNewGuess(guess)
        $guessBox.val('')
    };

    $guess = $('#guess')
    $guessBox = $guess.find('input')

    socket.on('newguess', handleNewGuess)
    $guessBox.on('keydown', onKeyDown)
}

jQuery(document).ready(handleReady)
