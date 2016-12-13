var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt-nodejs');

var Cardset = new Schema({
	name: String,
	cards:[ {type:mongoose.Schema.Types.ObjectId, ref:'Card' }],
	status: {type: String, enum:['draft','ready','archive'], default:"draft"},
	groups:[ {type:mongoose.Schema.Types.ObjectId, ref:'Group' }],
	createdDate: { type: Date, default: Date.now },
	updatedDate: { type: Date,default: Date.now }
});


module.exports = mongoose.model('Cardset', Cardset);