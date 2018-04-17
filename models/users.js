var mongoose        = require("mongoose"),
	bcrypt          = require("bcryptjs")

var userSchema = new mongoose.Schema({
	username: String,
	password: String
});

userSchema.methods.hashPass = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.validatePass = function(password){
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);