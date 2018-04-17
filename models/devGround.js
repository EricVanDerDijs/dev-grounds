var mongoose = require("mongoose");
 
var devGroundSchema = new mongoose.Schema({
    name: String,
    img: String,
    description: String,
    price: String,
    lat: String,
    lng: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});
 
module.exports = mongoose.model("devGround", devGroundSchema);