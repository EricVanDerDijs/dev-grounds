var express        = require("express"),
	mongoose       = require("mongoose"),
	passport       = require("passport"),
    session        = require("express-session"),
	bodyParser     = require("body-parser"),
	methodOverride = require("method-override"),
	flash          = require("flash"),
   // LocalStrategy = require("passport-local").Strategy,
	// DevGround     = require("./models/devGround"),
	// Comment       = require("./models/comment"),
	// User          = require("./models/users.js"),
	// GOOGLE API KEY: AIzaSyBCtQJ2e_EvUVbQzj6uxwGh-6A8Qw6MnvY
	app           = express(),
	port          = 3000;
	// require("./models/seedDB")();
	
//DB Config
mongoose.connect("mongodb://localhost/devGrounds");

// App Config
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));

// Passport related Config
app.use(session({
	secret: "fortytwo is the answer to everything",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.page = "";
	next();
});
//=================
// ROUTERS
//=================
app.use("/devgrounds/:id/comments", 
	require("./routes/comments.js"));

app.use("/devgrounds", 
	require("./routes/devgrounds.js"));

app.use("/", 
	require("./routes/index.js"));

// ------ Server Start -----
app.listen(port, function(req, res){
	console.log("devGrounds started at port: " + port);
});