var Item = require('../models/items')

exports.run = function(callback, errback) {
    Item.create({name: 'Broad beans'},
                {name: 'Tomatoes'},
                {name: 'Peppers'}, function(err, items) {
        if (err) {
            errback(err)
            return
        }
        callback(items)
    })
}

if (require.main === module) {
    require('./connect')
    exports.run(function() {
        var mongoose = require('mongoose')
        mongoose.disconnect()
    }, function(err) {
        console.error(err)
    })
}
