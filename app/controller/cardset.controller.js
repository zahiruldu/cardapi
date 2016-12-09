var Cardset = require('mongoose').model('Cardset');
var path = require("path");

var Token = require('../helpers/token');
var env = process.env.NODE_ENV || 'development';

var util = require('util'),
    OperationHelper = require('apac').OperationHelper;


exports.create = function(req,res){

	if(req.body.name) {
		var set = new Cardset({
	        name: req.body.name,
	      });
		set.save(function(err,cardset){
			if(err){
				res.status(404).send({message:err});
			} else{
				res.send(cardset);
			}
		})

	}

}


module.exports = exports;