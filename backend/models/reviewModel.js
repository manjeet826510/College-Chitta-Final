// models/Comment.js
import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  deptStream: String, 
  oldReview: [String],
  title: String, 
  placements: String, 
  infrastructure: String, 
  faculty: String, 
  other: String, 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true,
  },
  verified: Boolean,
  verifiedAt: Date,
}, { timestamps: true }); // Adding timestamps to track comment creation/update times

const Review = mongoose.model('reviews', reviewSchema);

export default Review;
