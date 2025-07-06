const mongoose= require("mongoose");
const RefundSchema = new mongoose.Schema({
  
      Desciption : {
            type: String
        }

})

module.exports = mongoose.model("Refundpolicy", RefundSchema);