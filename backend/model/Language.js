const mongoose = require("mongoose");

const LangSchema = mongoose.Schema({
    l_id: {
      type: Number,
      required: true
    },
    lang_name: {
      type: String,
      required: true
    },
    flag_url: {
      type: String,
      required: true
    }
  });
  

  module.exports = mongoose.model("languages", LangSchema);