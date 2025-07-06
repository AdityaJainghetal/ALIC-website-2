const mongoose= require("mongoose");
const FAQSchema = new mongoose.Schema({
    title : {
            type: String
        },
      response : {
            type: String
        },
        altText: {
            type:String
        }

})

module.exports = mongoose.model("faq", FAQSchema);