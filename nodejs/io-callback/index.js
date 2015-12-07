function wait(seconds, callback) {
  setTimeout(function(){
    callback(new Date())
  }, seconds * 1000)
}

console.log('Console log before calling wait:', new Date())

wait(3, function(date) {
  console.log('Console log inside anonymous callback:', date)
})

console.log('Console log after calling wait:', new Date())



function ProgressBar(duration){
    function wait(seconds, callback) {
      setTimeout(function(){
        callback(new Date())
      }, seconds * 1000)
    }

    var index = -1
    var length = duration


    var result = {}

    function onStart(){
        while(++index <= length){

            if (index % 10 == 0) {
                onProgress()
            }

            if(index === length){
                onEnd()
            }
        }
    }

    function onProgress(){
        console.log("progress: ", index)
    }

    function onEnd(){
        console.log("end")
    }

    function start(){
        onStart()
    }


    result = {
        start: start,
        onProgress: onProgress,
        onEnd: onEnd,
        onStart: onStart
    }

    return result
}


var progressbar = ProgressBar(100)

progressbar.start()
