const mongoose = require("mongoose");

const WhyChooseSchema = new mongoose.Schema({
  images: [
    {
      type: String,
    },
  ],
  Title: {
    type: String,
    required: true,
    trim: true,
  },
  altText:{
    type:String
  },
  keywordone: {
    type: String,
    trim: true,
  },
  keywordtwo: {
    type: String,
    trim: true,
  },
  keywordthree: {
    type: String,
    trim: true,
  },
  keywordfour: {
    type: String,
    trim: true,
  },
  keywordfive: {
    type: String,
    trim: true,
  },
   keywordsix: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("WhyChoose", WhyChooseSchema);
