// models/Comment.js
import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  img: String,
  text: String,
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
    required: true,
  },
}, { timestamps: true }); // Adding timestamps to track comment creation/update times

const Comment = mongoose.model('comments', commentSchema);

export default Comment;
