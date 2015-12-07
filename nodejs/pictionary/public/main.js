var pictionary = function() {
    var socket = io()
    var drawing = false
    var canvas, context

    var draw = function(position) {
        context.beginPath()
        context.arc(position.x, position.y,
                         6, 0, 2 * Math.PI)
        context.fill()
    }

    function handleDraw(event) {
        if(drawing === false) return
        var offset = canvas.offset()
        var position = {x: event.pageX - offset.left,
                        y: event.pageY - offset.top}
        draw(position)
        socket.emit('draw', position)
    }

    canvas = $('canvas')
    context = canvas[0].getContext('2d')
    canvas[0].width = canvas[0].offsetWidth
    canvas[0].height = canvas[0].offsetHeight
    canvas.on('mousedown', function(){
        drawing = true
    })
    canvas.on('mouseup', function(){
        drawing = false
    })

    canvas.on('mousemove', handleDraw)

    socket.on('draw', draw)

}

$(document).ready(function() {
    pictionary()
})
