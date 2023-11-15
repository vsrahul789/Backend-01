const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/practiceTemp1");

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  age: Number,
});

module.exports = mongoose.model("user", userSchema);
