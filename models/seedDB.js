var mongoose = require("mongoose");
var DevGround = require("./devGround");
var Comment   = require("./comment");
 
var data = [
    {
        name: "Night Code Challenge", 
        img: "https://images.unsplash.com/photo-1497493292307-31c376b6e479?ixlib=rb-0.3.5&s=413bf668e2139f6aae03f6355bcd59a7&auto=format&fit=crop&w=751&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Ethical Hacking - Into the Matrix", 
        img: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=74450f7cf15b30e723c1a6d49abcc62c&auto=format&fit=crop&w=750&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Abroad Coding Challenge", 
        img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3f6e5055d9ad1d603fd364c11823d026&auto=format&fit=crop&w=752&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]
 
function seedDB(){
   //Remove all campgrounds
   DevGround.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed devGrounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            // data.forEach(function(seed){
            //     DevGround.create(seed, function(err, devGround){
            //         if(err){
            //             console.log(err)
            //         } else {
            //             console.log("added a campground");
                        //create a comment
                        // Comment.create(
                        //     {
                        //         text: "This place is great, but I wish there was internet",
                        //         author: "Homer"
                        //     }, function(err, comment){
                        //         if(err){
                        //             console.log(err);
                        //         } else {
                        //             devGround.comments.push(comment._id);
                        //             devGround.save();
                        //             console.log("Created new comment");
                        //         }
                        //     });
            //         }
            //     });
            // });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;