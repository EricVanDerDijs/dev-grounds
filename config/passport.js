var LocalStrategy = require("passport-local").Strategy,
	User          = require("../models/users.js");

module.exports = function(passport){
	
passport.serializeUser(function(user, done){
	done(null, user._id);
});

passport.deserializeUser(function(id, done){
	User.findById(id, function(err, user){
		done(err, user);
	});
});

//================
// STRATEGIES
//================

passport.use("signup", new LocalStrategy(
	{
		passReqToCallback: true
	},
	function(req, username, password, done){
		process.nextTick(function() {
			User.findOne({username: username}, function(err, user){
				if (err) {
					req.flash("danger", "There has been a problem, could not SignUp");
					return done(err);
				}
				if (user) { //User already exist
					return done(null, false, req.flash("danger", "This username is already taken"));
				} else {
					var newUser = new User();
					newUser.username = username;
					newUser.password = newUser.hashPass(password);
					newUser.save(function(err){
						if (err) { req.flash("danger", "There has been a problem, could not SignUp"); }
					});
					return done(null, newUser, req.flash("success", "You have successfully SignedUp on devGrounds!!"));
				}
			});
		});
	}
));

passport.use("login", new LocalStrategy(
	{
		passReqToCallback: true
	},
	function(req, username, password, done){
		User.findOne({username: username}, function(err, user){
			if (err) {
				req.flash("danger", "There has been a problem, could not Login");
				return done(err);
			}
			if (!user) {
				return done(null, false, req.flash("danger", "The given username does not exist"));
			}
			if(!user.validatePass(password)){
				return done(null, false, req.flash("danger", "The password is wrong"));	
			} else {
				return done(null, user);
			}

		});	
	}
));
}