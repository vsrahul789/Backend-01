const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("comment", commentSchema);
