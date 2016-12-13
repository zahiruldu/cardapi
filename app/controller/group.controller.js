var Group = require('mongoose').model('Group');
var path = require("path");

var Token = require('../helpers/token');
var env = process.env.NODE_ENV || 'development';

var util = require('util'),
    OperationHelper = require('apac').OperationHelper;


exports.create = function(req,res){

	if(req.body.name) {
		var gr = new Group({
	        name: req.body.name

	      });
		gr.save(function(err,group){
			if(err){
				res.status(404).send({message:err});
			} else{
				res.send(group);
			}
		})

	}

};

exports.update = function(req, res){
	 // console.dir(req.body.cards[0]);
	 //  console.log(setId);

	var grId = req.params.grId;

	// console.log(req.body.status)


	var query = {
            '_id': req.params.grId
          };

	Group.update(
		    { _id: req.params.grId }, 
		    { $addToSet: { users:  { $each: req.body.users }}},
		    function(err,suc){
		    	//console.dir(suc)
		    	Group.findOne(query, function(err, data){
		    		//data.status = this.status;
		    		res.send(data);

		    		// if(req.body.status){
		    		// 	data.status = req.body.status;
		    		// }
		    		// data.save(function(err,group){
		    		// 	res.send(group);
		    		// })
		    		
		    	})
		    }
		);
			
};


exports.getGroups = function(req,res){
	Group.find({}).populate('users').exec(function(err, data){
		if(err){
			res.status(404).send(err);
		} else {
			res.send(data);
		}
	});
}


module.exports = exports;