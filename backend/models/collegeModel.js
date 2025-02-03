import mongoose from "mongoose";

const collegeSchema = mongoose.Schema({
  name: String,
  shortName: String,
  slug: String,
  rating: String,
  location: String,
  city: String,
  videoReviewLink: String,
  highlights: [{ particular: String, stat: String }],
  logo: String,
  image: String,
  info: [String],
  coursesAndFees: [{ Course: String, Fees: String, Eligibility: String }],
  cutoff: [{ cutoffName: String, tag: String, stat: [{ course: String, cutoff2023: String }] }]
}
);

const College = mongoose.model('College', collegeSchema);

export default College;
