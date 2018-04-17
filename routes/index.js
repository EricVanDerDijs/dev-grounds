var express       = require("express"),
	passport      = require("passport"),
	DevGround     = require("../models/devGround.js"),
	router        = express.Router();

require("../config/passport.js")(passport);

router.get("/signup", function(req, res){
	res.render("signup", {page: req.originalUrl} );
});

router.post("/signup", passport.authenticate("signup",
	{
		successRedirect: "/",
		failureRedirect: "/signup"
	}
));

router.get("/login", function(req, res){
	res.render("login", { page: req.originalUrl } );
});

router.post("/login", passport.authenticate("login",
	{
		successReturnToOrRedirect: "/",
		failureRedirect: "/login"
	}
));

router.get("/logout", function(req, res){
	req.flash("success", "You have logged out");
	req.logout();
	res.redirect("/");
});

router.get("/", function(req, res){
	res.render("landing");
});

module.exports = router;