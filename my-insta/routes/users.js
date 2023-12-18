var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost:27017/my-insta");

const userSchema = new mongoose.Schema({
  username: String,
  fullname: String,
  age: Number,
  email: String,
  password: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  bio: { type: String, default: "" },
});

userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema);
