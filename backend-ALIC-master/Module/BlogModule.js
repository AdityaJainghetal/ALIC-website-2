const mongoose= require("mongoose");
const BlogSchema = new mongoose.Schema({
        images: [
        {
            type: String
        }
      
    ],
      Blog :{
        type:String
      },
       Alttage:{
    type:String
  },
          URL : {
            type: String
        },

   BlogCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogCategory"
    },
  

      author:{
         type:String
      },
      title:{
        type:String
      },
      Description:{
        type:String
      },
      excerpt:{
        type:String
      },
      LastDate: { // Changed to Date if it's a date field
    type: Date,
  },


})

module.exports = mongoose.model("Blog", BlogSchema);