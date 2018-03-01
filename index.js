require("dotenv").config();
const ENV = process.env;

var plantuml = require('node-plantuml');
plantuml.useNailgun(); // Activate the usage of Nailgun 

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var crypto = require('crypto')
var fs = require('fs')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

var textParser = bodyParser.text({type: '*/*'})

app.get('/png/:hash',function(req, res) {
  	var path = `/tmp/plantuml-server/${req.params.hash}.png`
  	res.setHeader('Content-Type', 'image/png');
	let readStream = fs.createReadStream(path);
    readStream.on('close', () => {
      res.end()
    })
    readStream.on('error', err => {
        res.statusCode = 500;
        res.end()
    });
    readStream.pipe(res);
})

app.post('/text', textParser, (request, response) => {
	var uml = request.body
	if(uml.indexOf('@startuml')!=0){
		response.json({
  			ok: false,	
  			error: 'plantuml script must start with "@startuml"'
  		})
  		return
	}

	var hash = crypto.createHash('md5').update(uml).digest("hex")
	var path = `/tmp/plantuml-server/${hash}.png`
	if (!fs.existsSync(path)) {
		var wstream = fs.createWriteStream(path)
		var gen = plantuml.generate(uml, {format: 'png'})
		gen.out.pipe(wstream)
	}else{
		console.log(`${path} already exists.`)
	}

  	response.json({
  		ok: true,
    	payload: {
    		hash: hash
    	}
  	})
})

app.get('/url', (request, response) => {
  response.json({
    chance: "url"
  })
})

app.listen(ENV.PORT)