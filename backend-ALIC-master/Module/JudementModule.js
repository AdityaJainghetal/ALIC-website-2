const mongoose = require("mongoose");

const judgementSchema = new mongoose.Schema({
  images: [
    {
      type: String,
    },
  ],
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
  },
     judementCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "judementCategory"
    },
  
  description: {
    type: String,
  },
  publicerName : {
    type: String
  },

  lastDate: {
    type: Date,
  },

  altText: {
    type:String
  }
});

module.exports = mongoose.model("Judgement", judgementSchema);
