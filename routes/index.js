var express   = require("express"),
	controller = require("../controllers/index.js"),
	router     = express.Router();

router.route("/signup")
	.get(controller.renderSignUp)
	.post(controller.signUp);

router.route("/login")
	.get(controller.renderLogin)
	.post(controller.login);

router.get("/logout", controller.logout);

router.get("/", controller.renderLanding);

module.exports = router;