require('./db/connect')
var express = require('express')
var bodyParser = require('body-parser')
var itemRoutes = require('./routes/items')
var app = express()
var PORT = process.env.PORT || 8080
app.use(bodyParser.json())
app.use(express.static('public'))

app.use('/', itemRoutes)
app.use('*', function(req, res) {
    res.status(404).json({ message: 'Not Found' })
})

app.listen(PORT, function() {
    console.log('Listening on port ', PORT)
})

exports.app = app
