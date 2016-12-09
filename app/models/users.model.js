var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
	name: String,
	username: String,
	email: { type: String, unique: true, index: true, lowercase:true },
	apiKey: { type: String, index:true, unique:true},
	password: String,
	userType: {type: String, enum:['general','manager'], default:"general"},
	createdDate: { type: Date, default: Date.now },
	updatedDate: { type: Date,default: Date.now }
});



/*
 |--------------------------------------------------------------------------
 | Hide password
 |--------------------------------------------------------------------------
*/
UserSchema.methods.toJSON = function(){
    var user = this.toObject();
    delete user.password;

    return user;
}

/*
 |--------------------------------------------------------------------------
 | Password hash create
 |--------------------------------------------------------------------------
*/
UserSchema.pre('save', function (next) {
    var self = this;

    if (!self.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt){
    	if(err) return next(err);

    	bcrypt.hash(self.password, salt, null, function (err, hash) {
        	if(err) return next(err);

        	self.password = hash;
        	next();
    	});
    })
});

/*
 |--------------------------------------------------------------------------
 | Compare Password
 |--------------------------------------------------------------------------
*/
UserSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, callback);
};


var Model = mongoose.model('User', UserSchema);
module.exports = Model;