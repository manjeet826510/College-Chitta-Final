import express, { text } from "express";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../utils.js";
import Comment from "../models/commentModel.js";
import Article from "../models/articleModel.js";
import User from "../models/userModel.js";

const commentRouter = express.Router();

commentRouter.get("/:id",
  expressAsyncHandler(async (req, res) => {
    // Access the name parameter from the request URL
    const id = req.params.id;
    // console.log(id);

    try {
      // Find the article by name
      const filteredComments = await Comment.find({ articleId: id }).sort({ createdAt: -1 }).populate("author", "name");
      // console.log(filteredComments);

      if (filteredComments.length > 0) {
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
    const { author, img, text, articleId } = req.body;

    const newComment = new Comment({
      author: req.user._id,
      img,
      text,
      articleId
    });

    const comment = await newComment.save();

   
    

    res.send(comment);
  })
);


commentRouter.put("/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // console.log(req.body);
    // console.log(req.params.id);
    const comment = await Comment.findById(req.params.id);
    // console.log(product);
    if (comment) {
        comment.text = req.body.text; 
        

      const updatedComment = await comment.save();
    //   console.log(updatedCollege);
      res.send({
        _id: updatedComment._id,
        text: updatedComment.text
      });
    } else {
      res.status(404).send({ message: "Comment not found" });
    }
  })
);

commentRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Comment.findByIdAndDelete(id);
    res.status(200).send({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting comment' });
  }
});



















export default commentRouter;
