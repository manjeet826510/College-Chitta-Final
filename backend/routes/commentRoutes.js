import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../utils.js";
import Comment from "../models/commentModel.js";
import Article from "../models/articleModel.js";

const commentRouter = express.Router();

commentRouter.get("/:name",
  expressAsyncHandler(async (req, res) => {
    // Access the name parameter from the request URL
    const name = req.params.name;

    try {
      // Find the article by name
      const filteredComments = await Comment.find({ articleName: name }).sort({ createdAt: -1 });

      if (filteredComments) {
        // console.log(filteredComments);
        res.send(filteredComments);
      } else {
        res.status(404).send({ message: 'Comments not found' });
      }
    } catch (error) {
      // Handle any errors that occur during the database query
      // console.error('Error fetching comments:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  })
);



commentRouter.get("/", async (req, res) => {

  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }



});

commentRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { author, img, text, articleName } = req.body;

    const newComment = new Comment({
      author,
      img,
      text,
      articleName
    });

    const comment = await newComment.save();

   
    

    res.send(comment);
  })
);


















export default commentRouter;
