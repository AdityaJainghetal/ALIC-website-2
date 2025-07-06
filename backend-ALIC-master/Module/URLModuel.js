const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
 
     URL : {
            type: String
        },
        altText:{
            type:String
        }
 
});

module.exports = mongoose.model("videodata", VideoSchema);
