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
	        cards:req.body.cards
	      });
		set.save(function(err,cardset){
			if(err){
				res.status(404).send({message:err});
			} else{
				res.send(cardset);
			}
		})

	}

};

exports.update = function(req, res){
	 // console.dir(req.body.cards[0]);
	 // console.log(setId);

	var setId = req.params.setId;

	console.log(req.body.groups)
	
	if(req.body.status){
		this.status = req.body.status;
	} else {
		this.status = '';
	}

	var query = {
            '_id': req.params.setId
          };

	Cardset.update(
		    { _id: req.params.setId }, 
		    //{ $addToSet: { cards:  { $each: req.body.cards } }},
		    { $addToSet: { groups:  { $each: req.body.groups } }, $addToSet: { cards:  { $each: req.body.cards } }},
		    function(err,suc){
		    	//console.dir(suc)
		    	Cardset.findOne(query, function(err, data){
		    		//data.status = this.status;
		    		if(req.body.status){
		    			data.status = req.body.status;
		    		}
		    		data.save(function(err,cards){
		    			res.send(cards);
		    		})
		    		
		    	})
		    }
		);
			
};


exports.getCardsets = function(req,res){
	// Cardset.find({}, function(err, cards){
	// 	if(err){
	// 		res.status(404).send(err);
	// 	} else {
	// 		res.send(cards);
	// 	}
	// });

	Cardset.find({}).populate('cards').exec(function(err, data){
		if(err){
			res.status(404).send(err);
		} else {
			res.send(data);
		}
	});
}


module.exports = exports;