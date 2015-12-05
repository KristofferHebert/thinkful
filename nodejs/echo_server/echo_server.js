var express = require('express')
var app = express()

function handleHeaderRequest(req, res){
    var headers_name = req.params.headers_name
    var headers = req.headers

    if(headers_name){
        headers = (headers[headers_name]) ? headers[headers_name] : "header not found"
    }

    res.json({
        data: headers
    })
}

function handleVersionRequest(req, res){
    res.json({"version": req.httpVersion})
}

app.get('/header/:headers_name?', handleHeaderRequest)
app.get('/version', handleVersionRequest)
app.listen(8001)
