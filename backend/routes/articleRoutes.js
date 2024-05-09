import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../utils.js";
import Article from "../models/articleModel.js";

const articleRouter = express.Router();

articleRouter.get("/", async (req, res) => {

  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }



});

articleRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    // const prodInfo = {nae, slug, image, brand, category, description, price, countInStock};
    // console.log(`name = ${req.body.name}`);
    const newArticle = new Article({
      

        name: req.body.name, 
        title: req.body.title, 
        thumbnail: req.body.thumbnail, 
        content: req.body.content,

        

      
    });
    // console.log(newArticle);

    const article = await newArticle.save();

    res.send(article);
  })
);

















export default articleRouter;
