const mongoose = require('mongoose'); 

var subcategorySchema = new mongoose.Schema({
    name: String,
    subCategory: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Subcategory"'

        type:String
    },
        images: [
        {
            type: String
        }
      
    ],
});

//Export the model
module.exports = mongoose.model('Subsubcategory', subcategorySchema);