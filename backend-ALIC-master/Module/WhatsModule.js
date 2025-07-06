const mongoose = require("mongoose");
const SucessSchema = new mongoose.Schema({
    images: [
        {
     type:String
}    ],
    CourseDescription: {
        type: String,
    },
    Coursename: {
        type: String,
    },

     altText:{
    type:String
  },
  
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    PDFbrochure: String


},
    {
        timestamps:true
    }
)

module.exports = mongoose.model("Whatsnew", SucessSchema);