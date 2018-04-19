var DevGround = require("../models/devGround.js");

var devGrounds = {
   //EDIT - Display form to edit a devground
   renderEditForm: function (req, res) {
      DevGround.findById(req.params.id, function (err, devGround) {
         if (err || !devGround) {
            console.log(err);
            req.flash("danger", "There has been a problem");
            res.redirect("back");
         } else {
            if (devGround.price === "Free") { devGround.price = "0" }
            res.render("devgrounds/edit", { devground: devGround });
         }
      });
   },
   //NEW - Display form to make a new devground
   renderNewForm: function (req, res) {
      res.render("devgrounds/new");
   },
   //UPDATE - Submmit changes to DB
   update: function (req, res) {
      if (!parseFloat(req.body.devground.price)) {
         req.body.devground.price = "Free" 
      } else { 
         req.body.devground.price = req.body.devground.price + " USD" 
      }
      DevGround.findByIdAndUpdate(req.params.id,   req.body.devground, function (err, devGround) {
         if (err || !devGround) {
            console.log(err);
            req.flash("danger", "There has been a problem");
            res.redirect("back");
         } else {
            req.flash("success", "Successful update");
            res.redirect('/devgrounds/' + devGround._id);
         }
      });
   },
   //DESTROY - Removes object from DB
   delete: function (req, res) {
      DevGround.findById(req.params.id, function (err, devGround) {
         if (err || !devGround) {
            console.log(err);
            req.flash("danger", "There has been a problem");
            res.redirect("back");
         } else {
            devGround.comments.forEach(function (comment) {
               comment.remove();
            });
            devGround.remove();
            req.flash("success", "devGround Removed");
            res.redirect('/devgrounds');
         }
      });
   },
   //SHOW- Display info about ONE devGround
   show: function (req, res) {
      DevGround.findById(req.params.id).populate('comments').exec(function (err, devGround) {
         if (err || !devGround) {
            console.log(err);
            req.flash("danger", "There has been a problem");
            res.redirect("back");
         } else {
            res.render("devgrounds/show", { devground: devGround });
         }
      });
   },
   //CREATE - Add new devground to DB
   create: function (req, res) {
      // Apply the Free tag to those that have price of 0 or empty
      if (!parseFloat(req.body.devground.price)) {
         req.body.devground.price = "Free" 
      } else { 
         req.body.devground.price = req.body.devground.price + " USD" 
      }
      //Save new dev_Ground to db
      DevGround.create(req.body.devground, function (err, devGround) {
         if (err) {
            console.log(err);
            req.flash("danger", "There has been a problem");
            res.redirect("back");
         } else {
            devGround.author.id = req.user._id;
            devGround.author.username = req.user.username;
            devGround.save();
            res.redirect("/devgrounds/" + devGround._id);
         }
      });
   },
   //INDEX - show all devgrounds
   index: function (req, res) {
      DevGround.find({}, function (err, devGrounds) {
         if (err) {
            console.log(err);
         } else {
            res.render("devgrounds/index",
               {
                  devgrounds: devGrounds,
                  page: req.originalUrl
               });
         }
      });
   }
}
module.exports = devGrounds;