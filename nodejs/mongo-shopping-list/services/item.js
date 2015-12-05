var Item = require('../models/items')

exports.save = function(name, callback, errback) {
    Item.create({ name: name }, function(err, item) {
        if (err) {
            errback(err)
            return
        }
        callback(item)
    })
}

exports.list = function(callback, errback) {
    Item.find(function(err, items) {
        if (err) {
            errback(err)
            return
        }
        callback(items)
    })
}

exports.update = function(id, changes, callback, errback) {
    Item.findByIdAndUpdate(id, changes, function(err, items) {
        if (err) {
            errback(err)
            return
        }
        callback(items)
    })
}

exports.destroy = function(id, callback, errback) {
    Item.findByIdAndRemove(id, function(err, items) {
        if (err) {
            errback(err)
            return
        }
        callback(items)
    })
}
