import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../utils.js";
import Article from "../models/articleModel.js";
import Comment from "../models/commentModel.js";

const articleRouter = express.Router();

articleRouter.get("/", async (req, res) => {

  try {
    const blogs = await Article.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


articleRouter.get("/:slug",
  expressAsyncHandler(async (req, res) => {
    // console.log(req.params );
    const blog = await Article.findOne({ slug: req.params.slug }).populate("author", "name");
    if (blog) {
      // console.log(blog);
      res.send(blog);
    } else {
      res.status(404).send({ message: "Blog Not Found" });
    }
  })
);


articleRouter.get("/admin/list-articles", isAuth, isAdmin, async (req, res) => {
  // console.log('/admin hitted');
   
  
  const blogs = await Article.find().populate("author", "name")
   
 
  res.send({ blogs });
});









articleRouter.get("/:name",
  expressAsyncHandler(async (req, res) => {
    // Access the name parameter from the request URL
    const name = req.params.name;

    try {
      // Find the article by name
      const blog = await Article.findOne({ name: name }).populate("author", "name");
      // console.log(blog);

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




articleRouter.post("/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    // const prodInfo = {nae, slug, image, brand, category, description, price, countInStock};
    // console.log(`name = ${req.body.name}`);
    const newArticle = new Article({
      

        slug: req.body.slug, 
        title: req.body.title, 
        thumbnail: req.body.thumbnail, 
        content: req.body.content,
        author: req.body.author,

        

      
    });
    // console.log(newArticle);

    const article = await newArticle.save();

    res.send(article);
  })
);



// Backend routes

// Save comment for a specific article
articleRouter.post("/:name/comments", async (req, res) => {
  // console.log("articleRouter hit");
  try {
    const articleId = req.params.name;
    // console.log(req.body);
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


articleRouter.put("/:slug",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    // console.log(req.body);
    // console.log(req.params.name);
    const article = await Article.findOne({ slug: req.params.slug }).populate("author", "name");
    // console.log(product);
    if (article) {
        article.slug = req.body.slug; 
        article.title = req.body.title; 
        article.thumbnail = req.body.image; 
        article.content = req.body.content; 
        

      const updatedArticle = await article.save();
    //   console.log(updatedArticle);
      res.send({
        _id: updatedArticle._id,
        name: updatedArticle.name, 
        title: updatedArticle.title, 
        thumbnail: updatedArticle.thumbnail, 
        content: updatedArticle.content, 
        author: updatedArticle.author
       
      });
    } else {
      res.status(404).send({ message: "Blog not found" });
    }
  })
);


// articleRouter.put("/:name",
//   isAuth,
//   isAdmin,
//   expressAsyncHandler(async (req, res) => {
//     // console.log(req.body);
//     // console.log(req.params.name);
//     const article = await Article.findOne({ name: req.params.name });
//     // console.log(product);
//     if (article) {
//         article.name = req.body.name; 
//         article.title = req.body.title; 
//         article.thumbnail = req.body.image; 
//         article.content = req.body.content; 
        

//       const updatedArticle = await article.save();
//     //   console.log(updatedArticle);
//       res.send({
//         _id: updatedArticle._id,
//         name: updatedArticle.name, 
//         title: updatedArticle.title, 
//         thumbnail: updatedArticle.thumbnail, 
//         content: updatedArticle.content, 
       
//       });
//     } else {
//       res.status(404).send({ message: "Blog not found" });
//     }
//   })
// );

articleRouter.delete("/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    // console.log(req.body);
    // console.log(req.params.id);
    const result = await Article.deleteOne({ _id: req.params.id });
    if (result.deletedCount > 0) {
    //   console.log("College deleted successfully");
      res.send(result);
      // Additional logic after successful deletion
    } else {
      res.status(404).send({ message: "Blog not found" });
    }
  })
);


















export default articleRouter;
