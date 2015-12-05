var chai = require('chai')
var chaiHttp = require('chai-http')

global.environment = 'test'
var server = require('../server.js')
var app = server.app

var Item = require('../models/items')
var seed = require('../db/seed')

var should = chai.should()

chai.use(chaiHttp)

describe('Shopping List', function() {
    before(function(done) {
        app = server.app
        seed.run(function() {
            done()
        })
    })
    it('It should get items', function(){
        chaiHttp(app)
        .get('/items')
    })
    it('It should create item', function(){
        return false
    })
    it('It should update items', function(){
        return false
    })
    it('It should destroy items', function(){
        return false
    })
    after(function(done) {
        Item.remove(function() {

                done()
        })
    })
})
