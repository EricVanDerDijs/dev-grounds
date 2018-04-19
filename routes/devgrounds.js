var express   = require("express"),
	middleware = require("../middleware"),
	devgrounds = require("../controllers/devgrounds.js")
	router     = express.Router();

//EDIT - Display form to edit a devground
router.get('/:id/edit',	
	middleware.isLoggedIn, middleware.checkDevgroundOwnership, 
	devgrounds.renderEditForm);

//NEW - Display form to make a new devground
router.get('/new', 
	middleware.isLoggedIn, devgrounds.renderNewForm);

router.route('/:id')
	//UPDATE - Submmit changes to DB
	.put( middleware.isLoggedIn, middleware.checkDevgroundOwnership,
	devgrounds.update)
//DESTROY - Removes object from DB
	.delete( middleware.isLoggedIn, middleware.checkDevgroundOwnership, 
	devgrounds.delete)
//SHOW- Display info about ONE devGround
	.get( devgrounds.show );

router.route("/")
	//INDEX - show all devgrounds
	.get( devgrounds.index )
	//CREATE - Add new devground to DB
	.post( middleware.isLoggedIn, devgrounds.create );

module.exports = router;