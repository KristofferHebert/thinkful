var request = require('supertest')
var client = request('http://localhost:8080')
var assert = require('assert')

describe('Shopping List', function() {
	it('should list items on get', function(done) {
		client.get('/items')
			.expect(function(res) {
				var responseItems = res.body
				var expectedItems = [{
					name: 'Broad beans',
					id: 0
				}, {
					name: 'Tomatoes',
					id: 1
				}, {
					name: 'Peppers',
					id: 2
				}]
				assert.deepEqual(responseItems, expectedItems)
				assert.equal(res.status, 200)

			})
			.end(done)
	});
	it('should add an item on post', function(done) {
        var body = {
            name : 'Potato'
        }
        client
			.post('/items')
			.send(body)
			.expect(201)
			.expect(function(err, res) {
				if (err) {
					throw err;
				}
                var responseItems = res.body
                var expectedItems = [{
                    name: 'Potato',
                    id: 3
                }]
                assert.deepEqual(responseItems, expectedItems)
			})
            .end(done)

	});
	it('should delete an item on delete', function(done) {
        client
			.delete('/items/3')
			.expect(200)
			.expect(function(err, res) {
				if (err) {
					throw err;
				}
                var responseItems = res.body
                var expectedItems = [{
                    name: 'Potato',
                    id: 3
                }]
                assert.deepEqual(responseItems, expectedItems)
			})
            .end(done)

	});
	it('should return error if requested item to delete does not exist', function(done) {
        client
			.delete('/items/33')
			.expect(400)
			.expect(function(err, res) {
				if (err) {
					throw err;
				}
                var response = res.body
                var expectedResponse = {
                  "item": "Item not found"
                }
                assert.deepEqual(response, expectedResponse)
			})
            .end(done)

	});
});
