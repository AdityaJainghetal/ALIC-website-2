const mongoose = require("mongoose");
const SyllabusSchema = new mongoose.Schema({
    
  
    Coursename: {
        type: String,
    },

    altText:{
        type:String
    },

   category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SyllabusCategory"
  },
  
    PDFbrochure: String


},
    {
        timestamps:true
    }
)

module.exports = mongoose.model("Syllabus", SyllabusSchema);