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

collegeRouter.get("/admin", isAuth, isAdmin, async (req, res) => {
  console.log('admin route hitted');
   
  
  const colleges = await College.find()
   
 
  res.send({ colleges });
});

collegeRouter.get("/:id",
expressAsyncHandler(async (req, res) => {
  // console.log(req.params);
  const college = await College.findOne({ _id: req.params.id });
  if (college) {
    res.send(college);
  } else {
    res.status(404).send({ message: "College Not Found" });
  }
})
);

collegeRouter.get("/:slug",
  expressAsyncHandler(async (req, res) => {
    console.log("hit");
    console.log(req.params);
    const college = await College.findOne({ slug: req.params.slug });
    if (college) {
      res.send(college);
    } else {
      res.status(404).send({ message: "College Not Found" });
    }
  })
);





collegeRouter.post("/",
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




collegeRouter.put("/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    // console.log(req.body);
    // console.log(req.params.id);
    const college = await College.findById(req.params.id);
    // console.log(product);
    if (college) {
        college.name = req.body.name; 
        college.shortName = req.body.sname; 
        college.slug = req.body.slug; 
        college.rating = req.body.rating; 
        college.location = req.body.location; 
        college.city = req.body.city; 
        college.videoReviewLink = req.body.reviewLink;
        college.highlights = req.body.highlights;
        college.logo = req.body.logoUrl;
        college.image = req.body.imageUrl;
        college.info = req.body.info;
        college.coursesAndFees = req.body.coursesAndFees;
        college.cutoff = req.body.cutoff;

      const updatedCollege = await college.save();
    //   console.log(updatedCollege);
      res.send({
        _id: updatedCollege._id,
        name: updatedCollege.name, 
        shortName: updatedCollege.sname, 
        slug: updatedCollege.slug, 
        rating: updatedCollege.rating, 
        location: updatedCollege.rating, 
        city: updatedCollege.city, 
        videoReviewLink: updatedCollege.reviewLink,
        highlights: updatedCollege.highlights,
        logo: updatedCollege.logoUrl,
        image: updatedCollege.imageUrl,
        info: updatedCollege.info,
        coursesAndFees: updatedCollege.coursesAndFees,
        cutoff: updatedCollege.cutoff,
      });
    } else {
      res.status(404).send({ message: "College not found" });
    }
  })
);

collegeRouter.delete("/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    // console.log(req.body);
    // console.log(req.params.id);
    const result = await College.deleteOne({ _id: req.params.id });
    if (result.deletedCount > 0) {
    //   console.log("College deleted successfully");
      res.send(result);
      // Additional logic after successful deletion
    } else {
      res.status(404).send({ message: "College not found" });
    }
  })
);

















export default collegeRouter;
