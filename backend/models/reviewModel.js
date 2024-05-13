// models/Comment.js
import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  

  title: String, 
  placements: String, 
  infrastructure: String, 
  faculty: String, 
  other: String, 
  name: String,
  image: String,
  slug: String,
  verified: Boolean,
}, { timestamps: true }); // Adding timestamps to track comment creation/update times

const Review = mongoose.model('reviews', reviewSchema);

export default Review;
