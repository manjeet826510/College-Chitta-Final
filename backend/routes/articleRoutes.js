import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../utils.js";
import Article from "../models/articleModel.js";
import Comment from "../models/commentModel.js";

const articleRouter = express.Router();





articleRouter.get("/:name",
  expressAsyncHandler(async (req, res) => {
    // Access the name parameter from the request URL
    const name = req.params.name;

    try {
      // Find the article by name
      const blog = await Article.findOne({ name: name });

      if (blog) {
        res.send(blog);
      } else {
        res.status(404).send({ message: 'Blog not found' });
      }
    } catch (error) {
      // Handle any errors that occur during the database query
      console.error('Error fetching article:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  })
);



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



// Backend routes

// Save comment for a specific article
articleRouter.post("/:name/comments", async (req, res) => {
  console.log("articleRouter hit");
  try {
    const articleId = req.params.name;
    console.log(req.body);
    const { author, text } = req.body;
    // Save the comment to the database and associate it with the article
    // Ensure to handle validation and error checking
    const comment = await Comment.create({ author, text, article: articleId });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "err aya" });
  }
});

// Fetch all comments for a specific article
articleRouter.get("/:name/comments", async (req, res) => {
  try {
    const articleId = req.params.name;
    // Fetch all comments associated with the specified article
    const comments = await Comment.find({ article: articleId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


















export default articleRouter;
