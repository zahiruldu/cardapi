var Card = require('mongoose').model('Card');
var path = require("path");

var Token = require('../helpers/token');
var env = process.env.NODE_ENV || 'development';

var util = require('util'),
    OperationHelper = require('apac').OperationHelper;


exports.create = function(req,res){

	if(req.body.name) {
		var card = new Card({
	        name: req.body.name,
	        cardType: req.body.type
	      });
		card.save(function(err,card){
			if(err){
				res.status(404).send({message:err});
			} else{
				res.send(card);
			}
		})

	}

};


exports.getcards = function(req,res){
	Card.find({}, function(err, cards){
		if(err){
			res.status(404).send(err);
		} else {
			res.send(cards);
		}
	});
}


module.exports = exports;