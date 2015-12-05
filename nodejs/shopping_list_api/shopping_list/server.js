var express = require('express')
var bodyParser = require('body-parser')

// Poly fill for Array.prototype.find
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}


var Storage = function() {
    this.items = []
    this.id = 0
}

Storage.prototype.add = function(name) {
    var item = {name: name, id: this.id}
    this.items.push(item)
    this.id += 1
    return item
}

Storage.prototype.removeById = function(id) {
    var removedItem
    var self = this

    self.items.find(function(item, i){
        if(item.id == id) {
            removedItem = item
            self.items.splice(i, 1)
            return removedItem
        }
    })
    return removedItem
}

var storage = new Storage()
storage.add('Broad beans')
storage.add('Tomatoes')
storage.add('Peppers')

var app = express()
app.use(express.static('public'))
app.use(bodyParser.json())

app.post('/items', function(req, res) {
    if (!req.body) {
        return res.sendStatus(400)
    }

    var item = storage.add(req.body.name)
    res.status(201).json(item)
})
app.delete('/items/:id?', function(req, res) {
    var ID = req.params.id

    var deletedItem = storage.removeById(ID)

    if(deletedItem === undefined){
        return res.status(400).json({
            "error": "Missing ID with request"
        })
    }

    res.json({
        item : deletedItem
    })
})


app.get('/items', function(req, res) {
    res.json(storage.items)
})

app.listen(process.env.PORT || 8080)
