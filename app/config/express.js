var express = require('express');
var mongoose = require("mongoose");
var session = require('express-session');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var rootPath = path.normalize(__dirname + '/..');
var fs = require('fs');
var flash = require('connect-flash');
var ejs = require('ejs');

module.exports = function(app,config,passport){

	app.set('port', process.env.PORT || 3333);
	
	console.log(config.root + '/views')
	app.engine('.ejs', require('ejs').__express);
	app.set('views', config.root + '/views');
	app.set('view engine', 'ejs');
	app.set('view options', {layout: true});

	app.use(methodOverride());
	app.use(session({
	  cookieName: 'session',
	  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
	  duration: 30 * 60 * 1000,
	  activeDuration: 5 * 60 * 1000,
	  httpOnly: true,
	  secure: true,
	  ephemeral: true
	}));

	app.use(function(req,res,next){
    	res.locals.session = req.session;
    	next();
	});

	app.use(cors());
	app.options('*', cors());
	// parse application/json
	app.use(bodyParser.json());                        
	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: true }));

	//initialize passport
	app.use(flash());
	mongoose.connection.once('connected', function(){
		console.log("Connected to database");
	});

	//define server routes
	var routes_path = config.root + '/routes';
	fs.readdirSync(routes_path).forEach(function (file) {
	  require(routes_path+'/'+file)(app,passport)
	});
	app.use(express.static('./app'));
	return app;
}