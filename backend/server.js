import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import contactRouter from "./routes/contactRoutes.js";
import College from "./models/collegeModel.js";


dotenv.config();

console.log(process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log("error ="+err.message));

const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.use(`/api/contact`, contactRouter);
app.get('/api/colleges', async (req, res) => {
  try {
    const colleges = await College.find();
    res.json(colleges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
);

app.use((err, req, res, next) => {
  //for express Async Handler
  res.status(500).send({ message: err.message });
});


const port = process.env.PORT || 5000;

app.listen(port, "0.0.0.0", () => {
  console.log(`server is listening at :${port}`);
});
