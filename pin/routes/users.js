const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost:27017/pin");

const userScheme = mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  profileImage: String,
  contact: Number,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
  boards: {
    type: Array,
    default: [],
  },
});

userScheme.plugin(plm);

module.exports = mongoose.model("user", userScheme);
