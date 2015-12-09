function handleReady($){
    var $guess
    var $guessBox
    var socket = io()

    function handleNewGuess(guess){
        console.log(guess)
        $guess.append('div').text(guess)
    }

    function onKeyDown(event) {
        if (event.keyCode != 13) { // Enter
            return
        }
        socket.emit('guess', 'guess: ' + $guessBox.val())
        $guessBox.val('')
    };

    $guess = $('#guess')
    $guessBox = $guess.find('input')

    socket.on('newguess', handleNewGuess)
    $guessBox.on('keydown', onKeyDown)
}

jQuery(document).ready(handleReady)
