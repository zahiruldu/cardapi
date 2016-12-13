var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt-nodejs');

var Group = new Schema({
	name: String,
	users:[{ type:mongoose.Schema.Types.ObjectId, ref:'User' }],
	createdDate: { type: Date, default: Date.now },
	updatedDate: { type: Date,default: Date.now }
});


module.exports = mongoose.model('Group', Group);