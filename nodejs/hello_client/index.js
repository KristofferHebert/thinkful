var unirest = require('unirest')


function handleGet(res){
      console.log('Status:', res.statusCode);
      console.log('Headers: ', res.headers);
      console.log('Body:', res.body);
}

unirest.get('http://localhost:8001/header').end(handleGet)
