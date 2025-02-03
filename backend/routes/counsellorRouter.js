import express from "express";
import expressAsyncHandler from "express-async-handler";
import dotenv from "dotenv"
import Counsellor from "../models/counsellorModel.js";

dotenv.config();


const counsellorRouter = express.Router();

counsellorRouter.get("/", async (req, res) => {

    try {
      const counsellors = await Counsellor.find().populate("user", "name image role");
      res.json(counsellors);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  
  
  
  });

counsellorRouter.get("/:id", async (req, res) => {
    // console.log('id route hitted');

    try {
      const counsellors = await Counsellor.findOne({user: req.params.id});
      res.json(counsellors);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  
  
  
  });

counsellorRouter.post("/signup",
  expressAsyncHandler(async (req, res) => {
    // console.log(req.body);
    const newCounsellor = new Counsellor({
      user: req.body.user,
      bio: req.body.bio,
      rating: 0,
      charge: req.body.charge,
    
    });
    const counsellor = await newCounsellor.save();
    // console.log(user);
    // res.send({
    //   _id: user._id,
    //   name: user.name,
    //   email: user.email,
    //   image: user.image,
    //   pdf: user.pdf,
    //   role: user.role,
    //   appliedRole: user.appliedRole,
    //   isCounsellor: user.isCounsellor,
    //   isAdmin: user.isAdmin,
    //   jwtToken: generateToken(user),
    // });
  })
);


export default counsellorRouter;