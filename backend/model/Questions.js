const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
    l_id: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    question: {
      type: String,
      required: true
    },
    options: {
        type: [String],
        required: true
      },
    answer:{
        type:String,
        required:true
    }

  });
  

  module.exports = mongoose.model("questions", QuestionSchema);