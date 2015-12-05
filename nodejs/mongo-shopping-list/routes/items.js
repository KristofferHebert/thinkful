var express = require('express')
var Item = require('../services/item')
var router = express.Router()

router.get('/items', function(req, res) {
    Item.list(function(items) {
        res.status(200).json(items)
    },
    function handleError(err){
        res.status(400).json(err)
    })
})

router.post('/items', function(req, res) {
    Item.save(req.body.name, function(item) {
        res.status(201).json(item)
    },
    function handleError(err){
        res.status(400).json(err)
    })
})

router.put('/items/:id', function(req, res) {
    var id = req.params.id
    Item.update(id, {name: req.body.name}, function(item) {
        res.status(201).json(item)
    },
    function handleError(err){
        res.status(400).json(err)
    })
})

router.delete('/items/:id', function(req, res) {
    var id = req.params.id
    Item.destroy(id, function(item) {
        res.status(201).json(item)
    },
    function handleError(err){
        res.status(400).json(err)
    })
})

module.exports = router