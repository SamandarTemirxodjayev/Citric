const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    default: null,
  },
  instagram: {
    type: String,
    default: null,
  },
  facebook: {
    type: String,
    default: null,
  },
  telegram: {
    type: String,
    default: null,
  }
});

const Users = mongoose.model("user", UserSchema);
module.exports = Users;