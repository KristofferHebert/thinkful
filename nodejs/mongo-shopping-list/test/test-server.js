var chai = require('chai')
var chaiHttp = require('chai-http')

global.environment = 'test'
var server = require('../server.js')
var app = server.app

var Item = require('../models/items')
var seed = require('../db/seed')
var ID = ''

var expect = chai.expect

chai.use(chaiHttp)

describe('Shopping List', function() {
	before(function(done) {
		seed.run(function() {
			done()
		})
	})
	it('It should get items', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res){
                expect(res).to.have.status(200)
                done()
            })

	})
	it('It should create item', function(done) {
        chai.request(app)
            .post('/items')
            .send({
                name: "Potato"
            })
            .end(function(err, res){
                ID = res.body._id
                expect(res.body.name).equal('Potato')
                expect(res.body).to.have.property('name')
    			expect(res).to.have.status(200);
                done()
            })

	})
	it('It should update items', function(done) {
        chai.request(app)
            .put('/items/' + ID)
            .send({
                name: "Super Potato"
            })
            .end(function(err, res){
                expect(res.body.name).equal('Super Potato')
                expect(res.body._id).equal(ID)
                expect(res.body).to.have.property('name')
    			expect(res).to.have.status(200);
                done()
            })
	})
	it('It should destroy items', function(done) {
        chai.request(app)
        .delete('/items/' + ID)
        .end(function(err, res){
            expect(res.body.name).equal('Super Potato')
            expect(res.body._id).equal(ID)
            expect(res.body).to.have.property('name')
            expect(res).to.have.status(200);
            done()
        })
	})
	after(function(done) {
		Item.remove(function() {
			done()
		})
	})
})
