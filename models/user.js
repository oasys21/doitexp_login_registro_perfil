
var mongoose = require('mongoose');
module.exports = mongoose.model('User',{
	id: String,
	username: String,
	password: String,
	email: String,
	names: String,
	surnames: String,
	sex: String,
	born: Date,
	street: String,
	distrit: String,
	city: String,
	code: Number,
	number: Number
});
