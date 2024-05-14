import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../utils.js";
import Comment from "../models/commentModel.js";
import Article from "../models/articleModel.js";
import Review from "../models/reviewModel.js";

const reviewRouter = express.Router();

reviewRouter.get("/", async (req, res) => {

  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

reviewRouter.put("/admin/verify/:reviewId", isAuth, isAdmin, 
  
  expressAsyncHandler(async (req, res) => {
    const reviewId = req.params.reviewId;

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { verified: true },
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


reviewRouter.get("/", async (req, res) => {

  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }



});

reviewRouter.get("/admin", isAuth, isAdmin, async (req, res) => {
   
  
  const reviews = await Review.find()
   
 
  res.send({ reviews });
});



reviewRouter.get("/:slug",
  expressAsyncHandler(async (req, res) => {
    // Access the name parameter from the request URL
    const slug = req.params.slug;

    try {
      // Find the article by name
      const filteredReviews = await Review.find({ slug: slug }).sort({ createdAt: -1 });

      if (filteredReviews.length > 0) {
        // console.log(filteredComments);
        res.send(filteredReviews);
      } else {
        res.status(404).send({ message: 'Reviews not found' });
      }
    } catch (error) {
      // Handle any errors that occur during the database query
      // console.error('Error fetching comments:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  })
);




reviewRouter.get("/", async (req, res) => {

  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }



});


reviewRouter.post("/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { title, placements, infrastructure, faculty, other, name, image, slug, verified } = req.body;

    const newReview = new Review({
      title, placements, infrastructure, faculty, other, name, image, slug, verified
    });

    const review = await newReview.save();

   
    

    res.send(review);
  })
);


















export default reviewRouter;
