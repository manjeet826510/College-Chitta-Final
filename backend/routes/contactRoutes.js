import express from "express";
import expressAsyncHandler from "express-async-handler";
import { createTransport } from 'nodemailer';
import dotenv from "dotenv"
import Contact from "../models/contactModel.js";

dotenv.config();


const contactRouter = express.Router();

contactRouter.post('/', (req, res) => {
  // console.log(req.body);
  const { name, email, msg } = req.body;
  // console.log(name);
  // console.log(email);
  // console.log(message);

  // Create a transporter using your email service (e.g., Gmail)
  const transporter = createTransport({
      service: 'gmail',
      auth: {
          user: process.env.USER, // your email
          pass: process.env.PASS  // your email password or an app-specific password
      }
  });

  // Set up email data
  const mailOptions = {
      from: email,
      cc: email,
      to: process.env.TO, // recipient's email
      subject: `Thank you, ${name} for messaging College Chitta`,
      text: msg,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error sending email:', error);
          res.status(500).send('Error sending email');
      } else {
          // console.log('Email sent:', info.response);
          res.status(200).send('Email sent successfully');
      }
  });
});


contactRouter.post("/save-details",
  expressAsyncHandler(async (req, res) => {
    // console.log(req.body);
    const newContact = new Contact({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      text: req.body.text,
    });
    const contact = await newContact.save();
    // console.log(user);
    res.send({
      msg : "saved successfully"
    });
  })
);


export default contactRouter;
