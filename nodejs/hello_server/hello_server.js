var express = require('express')
var app = express()

function handleHomepage(req, res) {
	res.send("Hello World")
}

function handleFirstNameLastName(req, res) {
	var first = req.params.firstname
	var last = req.params.lastname
	res.send(["Hello", first, last].join(" "))
}

function handleJediName(req, res) {
	var first = req.params.firstname
    first = first.substr(0, 2)
    var last = req.params.lastname
    last = last.substr(0, 3)
	res.send(["Hello", last + first].join(" "))
}

app.get('/', handleHomepage)
app.get('/:firstname/:lastname', handleFirstNameLastName)
app.get('/jedi/:firstname/:lastname', handleJediName)


app.listen(8000)
