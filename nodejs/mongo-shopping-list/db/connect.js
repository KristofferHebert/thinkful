var mongoose = require('mongoose')
var env = require('../enviroment')
var config = require('./config')

mongoose.connect(config[env].url)

module.exports = mongoose
