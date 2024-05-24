const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  user_id:{
    type: String,
    required:true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  languages:{
    type: [Number],
    default:[]
  }
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);