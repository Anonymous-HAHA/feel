const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type : [String],
    default : [],
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    // default: "",
  },
});

const Users = mongoose.model("User", userSchema);
module.exports = Users;
