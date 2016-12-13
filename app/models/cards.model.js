var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt-nodejs');

var Card = new Schema({
	name: String,
	cardType: {type: String, enum:['image','text'], default:"text"},
	createdDate: { type: Date, default: Date.now },
	updatedDate: { type: Date,default: Date.now }
});


module.exports = mongoose.model('Card', Card);