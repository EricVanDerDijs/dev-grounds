var express       = require("express"),
	comments      = require("../controllers/comments.js");
	middleware    = require("../middleware"),
	router        = express.Router({mergeParams: true});

//UPDATE - Send updated comment to DB
router.route("/:commentID")
	.put( middleware.isLoggedIn, middleware.checkCommentOwnership, 
	comments.update)
//DELETE - delete a comment in the DB
	.delete(	middleware.isLoggedIn, middleware.checkCommentOwnership, 
	comments.delete);

// CREATE - adds new comment data to DB
router.post("/", 
	middleware.isLoggedIn, comments.create);

module.exports = router;