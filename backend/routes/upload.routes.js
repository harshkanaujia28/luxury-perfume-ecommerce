// routes/upload.routes.js
import express from "express";
import upload from "../middlewares/multer.js";



const router = express.Router();

router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const fileUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({ url: fileUrl });
});

export default router; // ✅ Make sure this is here
