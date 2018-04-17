var DevGround = require("../models/devGround"),
    Comment   = require("../models/comment")

var middleware = {
	isLoggedIn: function(req, res, next){
		if (req.isAuthenticated()){
			next();
		} else {
			req.flash("warning", "You need to be logged in")
			req.session.returnTo = req.originalUrl;
			res.redirect("/login");
		}
	},
	checkDevgroundOwnership: function(req, res, next){
		DevGround.findById(req.params.id, function(err, devGround){
			if(err || !devGround){
				console.log(err);
				req.flash("danger", "There has been a problem");
				res.redirect("back");
			} else {
				if(devGround.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("warning", "Do not touch what isn't yours!!");
					res.redirect("back");
				}
			}
		});		
	},
	checkCommentOwnership: function(req, res, next){
		Comment.findById(req.params.commentID, function(err, comment){
			if(err || !comment){
				console.log(err);
				req.flash("danger", "There was been a problem")
			} else {
				if(comment.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("warning", "Do not touch what isn't yours!!");
					res.redirect("back");
				}
			}
		});		
	}
}

module.exports = middleware;