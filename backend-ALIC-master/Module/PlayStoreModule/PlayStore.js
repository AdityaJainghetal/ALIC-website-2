const mongoose= require("mongoose");
const PlaySchema = new mongoose.Schema({
        images: [
        {
            type: String
        }
      
    ],
      URL : {
            type: String
        },
      altText : 
            {
                type:String
            }
        

})

module.exports = mongoose.model("playstore", PlaySchema);