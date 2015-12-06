var unirest = require('unirest')
var express = require('express')
var events = require('events')

// tupac - ID: 1ZwdS5xdxEREPySFridCfh

function getRelatedFromApi(ID, callback) {
	unirest.get('https://api.spotify.com/v1/artists/' + ID + '/related-artists')
		.end(function(res) {
			if (res.ok) {
				callback(null, res.body)
			} else {
				callback(res.code, res.body)
			}
		})
}


var noResults = {
	artists: {
		items: [{
			external_urls: {
				spotify: '#'
			},
			followers: {
				href: null,
				total: 1252110
			},
			genres: ['g funk', 'gangster rap', 'hip hop', 'rap'],
			href: '#',
			id: '1ZwdS5xdxEREPySFridCfh',
			images: [],
			name: 'No Results',
			popularity: 75,
			type: 'artist',
			uri: '#'
		}]
	}
}

function getFromApi(endpoint, args) {
	var emitter = new events.EventEmitter()
	unirest.get('https://api.spotify.com/v1/' + endpoint)
		.qs(args)
		.end(function(res) {
			if (res.ok) {

				if (res.body.artists.items.length === 0) {
					return emitter.emit('end', noResults)
				}

				getRelatedFromApi(res.body.artists.items[0].id, function(err, resp) {
					if (err) emitter.emit('error', err)
					res.body.artists.items[0].related = resp.artists
					emitter.emit('end', res.body)
				})

			} else {
				emitter.emit('error', res.code)
			}
		})
	return emitter
}


var app = express()
app.use(express.static('public'))

app.get('/', function() {
	res.send('index.html')
})

app.get('/search/:name', function(req, res) {
	var searchReq = getFromApi('search', {
		q: req.params.name,
		limit: 1,
		type: 'artist'
	})

	searchReq.on('end', function(item) {
		var artist = item.artists.items[0]
		res.json(artist)
	})

	searchReq.on('error', function(code) {
		res.sendStatus(code)
	})
})

app.listen(8080)
