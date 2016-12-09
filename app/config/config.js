var path = require('path');
var rootpath = path.normalize(__dirname + '/..');
 
module.exports = {
	TOKEN_SECRET: process.env.TOKEN_SECRET || 'cardset-manager',
	
	development: {
		db: 'mongodb://127.0.0.1/card',
		root: rootpath,
		app: {
			name: 'cardset'
		}
	},

	production: {
		db: 'mongodb://afroza021:TithiTithi#021@ds023398.mlab.com:23398/passportauthentication',
		root: rootpath,
		app: {
			name: 'cardset'
		}
	}
}
