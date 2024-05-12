// models/Comment.js
import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  author: String,
  img: String,
  text: String,
  articleName: String,
}, { timestamps: true }); // Adding timestamps to track comment creation/update times

const Comment = mongoose.model('comments', commentSchema);

export default Comment;
