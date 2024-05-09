import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../utils.js";
import College from "../models/collegeModel.js";

const collegeRouter = express.Router();

collegeRouter.get("/", async (req, res) => {

  try {
    const colleges = await College.find();
    res.json(colleges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }



});

collegeRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    // const prodInfo = {nae, slug, image, brand, category, description, price, countInStock};
    console.log(`name = ${req.body.name}`);
    const newCollege = new College({
        name: req.body.name, 
        shortName: req.body.sname, 
        slug: req.body.slug, 
        rating: req.body.rating, 
        location: req.body.rating, 
        city: req.body.city, 
        videoReviewLink: req.body.reviewLink,
        highlights: req.body.highlights,
        logo: req.body.logoUrl,
        image: req.body.imageUrl,
        info: req.body.info,
        coursesAndFees: req.body.coursesAndFees,
        cutoff: req.body.cutoff

        

      
    });
    console.log(newCollege);

    const college = await newCollege.save();

    res.send(college);
  })
);

















export default collegeRouter;
