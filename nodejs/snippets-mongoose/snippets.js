var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost')

function handleError(err) {
	console.error('could not connect', err)
}

function handleOpen() {
	var snippetSchema = mongoose.Schema({
		name: {
			type: String,
			unique: true
		},
		content: String
	})

	var Snippet = mongoose.model('Snippet', snippetSchema)

	function create(name, content) {
		var snippet = {
			name: name,
			content: content
		}

		function handleCreate(err, snippet) {
			if (err || !snippet) {
				console.error("Could not create snippet", name)
				mongoose.disconnect()
				return
			}
			console.log("Created snippet", snippet.name)
			mongoose.disconnect()
		}
		Snippet.create(snippet, handleCreate)
	}

	function read(name) {
		function handleRead(err, snippet) {
			if (err || !snippet) {
				console.error("Could not read snippet", name)
				mongoose.disconnect()
				return
			}
			console.log("Read snippet", snippet.name)
			console.log(snippet.content)
			mongoose.disconnect()
		}
		Snippet.findOne({name: name }, handleRead)
	}

    function update(name, content) {
        function handleUpdate(err, snippet) {
            if (err || !snippet) {
                console.error("Could not update snippet", name)
                mongoose.disconnect()
                return
            }
            console.log("Updated snippet", snippet.name)
            mongoose.disconnect()
        }

        Snippet.findOneAndUpdate({ name: name }, {content: content}, handleUpdate)
    }

	function destroy(name, content) {
        function handleDestroy(err, snippet) {
			if (err || !snippet) {
				console.error("Could not delete snippet", name)
				mongoose.disconnect()
				return
			}
			console.log("Deleted snippet", snippet.name)
			mongoose.disconnect()
		}

        Snippet.findOneAndRemove({ name: name }, handleDestroy)
	}

	var SnippetCrud = {
		create: create,
		read: read,
		update: update,
		destroy: destroy
	}

    var main = function() {
            if (process.argv[2] == 'create') {
                SnippetCrud.create(process.argv[3], process.argv[4])
            }
            else if (process.argv[2] == 'read') {
                SnippetCrud.read(process.argv[3])
            }
            else if (process.argv[2] == 'update') {
                SnippetCrud.update(process.argv[3], process.argv[4])
            }
            else if (process.argv[2] == 'delete') {
                SnippetCrud.destroy(process.argv[3])
            }
            else {
                console.error('Command not recognized')
                mongoose.disconnect()
            }
        }

    main()


}



mongoose.connection.on('error', handleError)
mongoose.connection.once('open', handleOpen)
