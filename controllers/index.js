var passport = require("passport"),
    DevGround = require("../models/devGround.js");

require("../config/passport.js")(passport);

var indexRoutesController = {
   //Render SignUp Form
   renderSignUp: function (req, res) {
      res.render("signup", { page: req.originalUrl });
   },
   //Runs User creation and authentication 
   signUp: function(req,res, next){
      passport.authenticate("signup",
         {
            successRedirect: "/devgrounds",
            failureRedirect: "/signup"
         }
      )(req,res,next);
   },
   //Render Login Form
   renderLogin: function (req, res) {
      res.render("login", { page: req.originalUrl });
   },
   //Runs User authentication
   login: function(req,res, next){
      passport.authenticate("login",
         {
            successReturnToOrRedirect: "/devgrounds",
            failureRedirect: "/login"
         }
      )(req,res,next);
   },
   //Logs User Out
   logout: function (req, res) {
      req.flash("success", "You have logged out");
      req.logout();
      res.redirect("/devgrounds");
   },
   renderLanding: function (req, res) {
      res.render("landing");
   }
}
module.exports = indexRoutesController;