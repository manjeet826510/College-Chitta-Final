import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import contactRouter from "./routes/contactRoutes.js";
import College from "./models/collegeModel.js";
import userRouter from "./routes/userRoutes.js";
import uploadRouter from "./routes/uploadRouter.js";
import collegeRouter from "./routes/collegeRoutes.js";
import articleRouter from "./routes/articleRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import counsellorRouter from "./routes/counsellorRouter.js";
import bookingRouter from "./routes/bookingRoutes.js";
import payRouter from "./routes/payRoutes.js";


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

app.get(`/api/rzp/razorpay-key`, (req, res) => {
  const razorpayKey = process.env.REACT_APP_RAZORPAY_KEY_ID;
  res.json({ razorpayKey });
});

app.use(`/api/colleges`, collegeRouter);
app.use(`/api/blogs`, articleRouter);
app.use(`/api/comments`, commentRouter);
app.use(`/api/reviews`, reviewRouter);
app.use(`/api/contact`, contactRouter);
app.use(`/api/users`, userRouter);
app.use(`/api/counsellors`, counsellorRouter);
app.use(`/api/upload`, uploadRouter);
app.use(`/api/contact`, contactRouter);
app.use(`/api/bookings`, bookingRouter);
app.use(`/api/create`, payRouter);





const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);

app.use((err, req, res, next) => {
  //for express Async Handler
  res.status(500).send({ message: err.message });
});


const port = process.env.PORT || 5000;

app.listen(port, "0.0.0.0", () => {
  console.log(`server is listening at :${port}`);
});
