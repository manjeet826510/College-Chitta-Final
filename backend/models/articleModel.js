// models/College.js
import mongoose from "mongoose";

const articleSchema = mongoose.Schema({
  slug: String,
  title: String,
  thumbnail: String,
  content: [String],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}
);

const Article = mongoose.model('Article', articleSchema);

export default Article;


