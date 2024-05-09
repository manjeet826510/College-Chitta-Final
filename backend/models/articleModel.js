// models/College.js
import mongoose from "mongoose";

const articleSchema = mongoose.Schema({
  name: String,
  title: String,
  thumbnail: String,
  content: [String],
}
);

const Article = mongoose.model('Article', articleSchema);

export default Article;


