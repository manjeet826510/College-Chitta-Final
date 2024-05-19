import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../utils.js";
import Comment from "../models/commentModel.js";
import Article from "../models/articleModel.js";
import Review from "../models/reviewModel.js";

const reviewRouter = express.Router();

reviewRouter.get("/", async (req, res) => {

  try {
    const reviews = await Review.find().populate("user", "name");
    // console.log(reviews);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

reviewRouter.get("/", async (req, res) => {

  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }



});

reviewRouter.get("/admin", isAuth, isAdmin, async (req, res) => {
   
  
  const reviews = await Review.find().populate("user", "name image").populate("college", "name slug")
  // console.log(reviews);
  
   
 
  res.send({ reviews });
});


reviewRouter.get("/:id",
  expressAsyncHandler(async (req, res) => {
    const collegeId = req.params.id; // Get the college ID from the request URL parameter

    try {
      // Find reviews based on the college ID
      const filteredReviews = await Review.find({ college: collegeId }).sort({ createdAt: -1 }).populate("user", "name image").populate("college", "name");
      // console.log(filteredReviews);

      if (filteredReviews.length > 0) {
        res.send(filteredReviews);
      } else {
        res.status(404).send({ message: 'Reviews not found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Internal server error' });
    }
  })
);

reviewRouter.post("/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // console.log(req.body);
    const {deptStream, title, placements, infrastructure, faculty, other, college, verified } = req.body;
    const verifiedAt = verified ? new Date() : null;

    const newReview = new Review({
      deptStream, title, placements, infrastructure, faculty, other, user: req.user._id, college, verified, verifiedAt
    });

    const review = await newReview.save();

   
    

    res.send(review);
  })
);

reviewRouter.put("/admin/verify/:reviewId", isAuth, isAdmin, 
  
  expressAsyncHandler(async (req, res) => {
    const reviewId = req.params.reviewId;

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { verified: true, verifiedAt: Date.now() },
      { new: true } // Return the updated document
    );

    if(updatedReview){
      res.send(updatedReview );
    }
    else{
      res.status(404).send({ message: "Review not found" });
    }
  })
);

reviewRouter.put("/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // console.log(req.body);
    // console.log(req.params.id);
    const review = await Review.findById(req.params.id);
    // console.log(product);
    if (review) {
        review.oldReview = req.body.oldReview;
        review.title = req.body.title; 
        review.placements = req.body.placements; 
        review.infrastructure = req.body.infrastructure; 
        review.faculty = req.body.faculty; 
        review.other = req.body.other; 
        review.verified = false;
        

      const updatedReview = await review.save();
    //   console.log(updatedReview);
      res.send({
        _id: updatedReview._id,
        title: updatedReview.title,
        placements: updatedReview.placements,
        infrastructure: updatedReview.infrastructure,
        faculty: updatedReview.faculty,
        other: updatedReview.other,
        verified: false,
      });
    } else {
      res.status(404).send({ message: "Review not found" });
    }
  })
);

reviewRouter.delete("/admin/verify/:reviewId",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    // console.log(req.body);
    // console.log(req.params.id);
    const result = await Review.deleteOne({ _id: req.params.reviewId });
    if (result.deletedCount > 0) {
    //   console.log("College deleted successfully");
      res.send(result);
      // Additional logic after successful deletion
    } else {
      res.status(404).send({ message: "Review not found" });
    }
  })
);

reviewRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Review.findByIdAndDelete(id);
    res.status(200).send({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting review' });
  }
});


// reviewRouter.get("/", async (req, res) => {

//   try {
//     const articles = await Article.find();
//     res.json(articles);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }



// });


export default reviewRouter;
