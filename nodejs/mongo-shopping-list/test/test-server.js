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
		seed.run(function() {
			done()
		})
	})
	it('It should get items', function() {
        chai.request(app)
            .get('/itemsz')
            .then(function(res){
                    console.log(res.status);
                    should(err).equal(null);
    				should(res.status).equal(500);
            })
            .catch(function (err) {
                throw err;
            })
	})
	it('It should create item', function() {
        chai.request(app)
            .post('/items')
            .send({
                name: "Potato"
            })
            .then(function(res){
                    should(err).to.be.null;
    				should(res).to.have.status(400);
            })
            .catch(function (err) {
                throw err;
            })
	})
	it('It should update items', function() {
	})
	it('It should destroy items', function() {

	})
	after(function(done) {
		// Item.remove(function() {
        //
		// 	done()
		// })
	})
})
