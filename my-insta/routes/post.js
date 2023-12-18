const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
});

module.exports = mongoose.model("post", postSchema);
