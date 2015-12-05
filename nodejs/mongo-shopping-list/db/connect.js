var mongoose = require('mongoose')
var env = require('../enviroment')
var config = require('./config')

console.log('connecting to ', config[env].url);

mongoose.connect(config[env].url)

module.exports = mongoose
