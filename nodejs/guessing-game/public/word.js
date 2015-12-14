function handleReady($){
    var socket = io()
    var WORDS = [
        "word", "letter", "number", "person", "pen", "class", "people",
        "sound", "water", "side", "place", "man", "men", "woman", "women", "boy",
        "girl", "year", "day", "week", "month", "name", "sentence", "line", "air",
        "land", "home", "hand", "house", "picture", "animal", "mother", "father",
        "brother", "sister", "world", "head", "page", "country", "question",
        "answer", "school", "plant", "food", "sun", "state", "eye", "city", "tree",
        "farm", "story", "sea", "night", "day", "life", "north", "south", "east",
        "west", "child", "children", "example", "paper", "music", "river", "car",
        "foot", "feet", "book", "science", "room", "friend", "idea", "fish",
        "mountain", "horse", "watch", "color", "face", "wood", "list", "bird",
        "body", "dog", "family", "song", "door", "product", "wind", "ship", "area",
        "rock", "order", "fire", "problem", "piece", "top", "bottom", "king",
        "space"
    ];
    $wordsSelectContainer = $('#selectContainer')
    $wordsSelect = $('<select id="wordsselect">')


    WORDS.forEach(function(value){
        $wordsSelect.append($('<option value="'+ value +'">'+ value +'</option>'))
    })

    $wordsSelectContainer.append($wordsSelect)

    function handleChange(){
        socket.emit('choosenword', $(this).val())
        $(this).parent().hide()
    }

    $wordsSelect.change(handleChange)

}

jQuery(document).ready(handleReady)
