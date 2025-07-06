const mongoose= require("mongoose");
const SucessSchema = new mongoose.Schema({
        images: [
        {
            type: String
        }
      
    ],
      StudentName : {
            type: String
        },
        
      Judicial : {
            type: String
        },

        altText: {
            type:String
        }


})

module.exports = mongoose.model("Success", SucessSchema);