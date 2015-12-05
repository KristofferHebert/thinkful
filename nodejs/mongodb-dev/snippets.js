var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost/', function(err, mongoclient) {
	if (err) {
		console.log(err)
		mongoclient.close()
		return
	}
	var collection = mongoclient.collection('snippets')

    var create = function(name, content) {
        var snippet = {
            name: name,
            content: content
        }
        collection.insert(snippet, function(err, result) {
            if (err) {
                console.error("Could not create snippet", name)
                mongoclient.close()
                return
            }
            console.log("Created snippet", name)
            mongoclient.close()
        })
    }

    var read = function(name) {
        var query = {
            name: name
        }
        collection.findOne(query, function(err, snippet) {
            if (!snippet || err) {
                console.error("Could not read snippet", name)
                mongoclient.close()
                return
            }
            console.log("Read snippet", snippet.name)
            console.log(snippet.content)
            mongoclient.close()
        })
    }

    var update = function(name, content) {
        var query = {
            name: name
        }

        var update = {
            $set: {content: content}
        }

        collection.findAndModify(query, null, update, function(err, result) {
            var snippet = result.value
            if (!snippet || err) {
                console.error("Could not update snippet", name)
                mongoclient.close()
                return
            }
            console.log("Updated snippet", snippet.name)
            mongoclient.close()
        })
    }

    var del = function(name, content) {
        var query = {
            name: name
        }
        collection.findAndRemove(query, function(err, result) {
            var snippet = result.value
            if (!snippet || err) {
                console.error("Could not delete snippet", name)
                mongoclient.close()
                return
            }
            console.log("Deleted snippet", snippet.name)
            mongoclient.close()
        })
    }

	var main = function() {
		if (process.argv[2] == 'create') {
			create(process.argv[3], process.argv[4])
		} else if (process.argv[2] == 'read') {
			read(process.argv[3])
		} else if (process.argv[2] == 'update') {
			update(process.argv[3], process.argv[4])
		} else if (process.argv[2] == 'delete') {
			del(process.argv[3])
		} else {
			console.error('Command not recognized')
			mongoclient.close()
		}
	}

	main()
})
