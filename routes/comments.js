var express       = require("express"),
	comments      = require("../controllers/comments.js");
	middleware    = require("../middleware"),
	router        = express.Router({mergeParams: true});

//EDIT - display edit comment form
router.get("/:commentID/edit", 
	middleware.isLoggedIn, middleware.checkCommentOwnership, 
	comments.renderEditForm);

//NEW - display new comment form
router.get("/new", 
	middleware.isLoggedIn, comments.renderNewForm);

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