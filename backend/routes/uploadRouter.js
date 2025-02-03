import express from "express";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const uploadRouter = express.Router();

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.AccessKey,
    secretAccessKey: process.env.SecretKey,
  },
  region: process.env.region,
});

// Multer config
const upload = multer({
  limits: 1024 * 1024 * 5,
  fileFilter: function (req, file, done) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/webp" ||
      file.mimetype === "application/pdf" // Allow PDF files
    ) {
      done(null, true);
    } else {
      done("Multer error - File type is not supported", false);
    }
  },
});

// Upload to S3 bucket
const uploadToS3 = async (fileData, type) => {
  const params = {
    Bucket: process.env.bucket,
    Key: type === 'image' ? `${Date.now().toString()}.jpg` : `${Date.now().toString()}.pdf`,
    Body: fileData,
    ContentType: type === 'image' ? 'image/jpeg' : 'application/pdf', // Set Content-Type based on file type
  };

  const command = new PutObjectCommand(params);

  try {
    const data = await client.send(command);
    const Url = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
    return { data, Url };
  } catch (error) {
    console.log(`error = ${error}`);
    throw error;
  }
};

uploadRouter.post("/pdf", upload.single('pdf'), async (req, res) => {
  // console.log(req.file);

  // console.log("pdf route hitted");
  // console.log(req.file);

  if (req.file) {
    try {
      const { Url } = await uploadToS3(req.file.buffer, 'pdf');
      res.json({ Url });
    } catch (error) {
      res.status(500).json({ error: "Failed to upload pdf to S3" });
    }
  } else {
    res.status(400).json({ error: "No pdf file provided" });
  }
});

uploadRouter.post("/", upload.single("image"), async (req, res) => {
  // console.log(req.file);

  if (req.file) {
    try {
      const { Url } = await uploadToS3(req.file.buffer, 'image');
      res.json({ Url });
    } catch (error) {
      res.status(500).json({ error: "Failed to upload image to S3" });
    }
  } else {
    res.status(400).json({ error: "No image file provided" });
  }
});

export default uploadRouter;
