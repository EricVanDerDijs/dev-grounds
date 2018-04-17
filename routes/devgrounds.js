var express         = require("express"),
	DevGround        = require("../models/devGround.js"),
	middleware       = require("../middleware"),
	router           = express.Router();

//EDIT - Display form to edit a devground
router.get('/:id/edit', 
	middleware.isLoggedIn, middleware.checkDevgroundOwnership, 
	function (req, res) {
		DevGround.findById(req.params.id, function(err, devGround){
			if(err || !devGround) {
				console.log(err);
				req.flash("danger", "There has been a problem");
				res.redirect("back");
			}
			else {
				if (devGround.price === "Free") { devGround.price = "0"}
				res.render("devgrounds/edit", { devground: devGround });	
			}
		});
	});

//NEW - Display form to make a new devground
router.get('/new', 
	middleware.isLoggedIn, 
	function(req, res){
		res.render("devgrounds/new");
});

//UPDATE - Submmit changes to DB
router.put('/:id', 
	middleware.isLoggedIn, middleware.checkDevgroundOwnership, 
	function (req, res) {
		if (!parseFloat(req.body.devground.price)) { req.body.devground.price = "Free"} 
		else { req.body.devground.price = req.body.devground.price + " USD" }
		DevGround.findByIdAndUpdate(req.params.id, req.body.devground, 
		function (err, devGround){
			if (err || !devGround) {
				console.log(err);
				req.flash("danger", "There has been a problem");
				res.redirect("back");
			} else {
				req.flash("success", "Successful update");
				res.redirect('/devgrounds/'+devGround._id);
			}
		});
});

//DESTROY - Removes object from DB
router.delete('/:id', 
	middleware.isLoggedIn, middleware.checkDevgroundOwnership, 
	function (req, res){
		DevGround.findById(req.params.id, function(err, devGround){
			if (err || !devGround) {
				console.log(err);
				req.flash("danger", "There has been a problem");
				res.redirect("back");
			} else {
				devGround.comments.forEach(function (comment){
					comment.remove();
				});
				devGround.remove();
				req.flash("success", "devGround Removed");
				res.redirect('/devgrounds');
			}
		});
});

//SHOW- Display info about ONE devGround
router.get('/:id', function(req, res){
	DevGround.findById(req.params.id).populate('comments').exec(function(err, devGround){
		if (err || !devGround) {
			console.log(err);
			req.flash("danger", "There has been a problem");
			res.redirect("back");
		} else {
			res.render("devgrounds/show", {devground: devGround});
		}
	});
});

//CREATE - Add new devground to DB
router.post('/', 
	middleware.isLoggedIn, 
	function(req,res){
		// Apply the Free tag to those that have price of 0 or empty
		if (!parseFloat(req.body.devground.price)) { req.body.devground.price = "Free"} 
		else { req.body.devground.price = req.body.devground.price + " USD" }
		console.log(req.body.devground);
		//Save new dev_Ground to db
		DevGround.create(req.body.devground, function(err, devGround){
			if (err) {
				console.log(err);
				req.flash("danger", "There has been a problem");
				res.redirect("back");
			} else {
				devGround.author.id = req.user._id;
				devGround.author.username = req.user.username;
				devGround.save();
				res.redirect("/devgrounds/"+devGround._id);
			}
		});
});

//INDEX - show all devgrounds
router.get("/", function(req, res){
	DevGround.find({}, function(err, devGrounds){
		if (err){
			console.log(err);
		} else {
			res.render("devgrounds/index", 
				{ devgrounds: devGrounds,
					page: req.originalUrl 
				} );
		}
	});
});

module.exports = router;