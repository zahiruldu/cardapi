var path = require("path");
var express = require("express");
var http = require("http");
var fs = require('fs');

var app = express();
var env = process.env.NODE_ENV || 'development',
	config = require('./app/config/config')[env],
	mongoose = require('mongoose')

//models define 
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file)
});

var db = mongoose.connect(config.db);

require('./app/config/express')(app,config);


var port = process.env.PORT || 3333;
app.listen(port, function(){
	console.log(env+ ' server listen on port ' + port);
})

exports = module.exports = app