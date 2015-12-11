function handleReady($){
    var $guess, $guessBox
    var socket = io()

    function handleNewGuess(guess){
        $guess.find('#newguess')[0].appendChild($('<li>').text(guess))
    }

    function onKeyDown(event) {
        if (event.keyCode != 13) return

        var guess = 'guess: ' + $guessBox.val()
        socket.emit('guess', guess)

        handleNewGuess(guess)
        $guessBox.val('')
    }

    $guess = $('#guess')
    $guessBox = $guess.find('input')

    socket.on('newguess', handleNewGuess)
    $guessBox.on('keydown', onKeyDown)
}

jQuery(document).ready(handleReady)
