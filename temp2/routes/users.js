const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost:27017/practiceTemp2");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  secret: String,
});

userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema);
