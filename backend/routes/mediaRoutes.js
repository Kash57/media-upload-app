const express = require("express");
const multer = require("multer");
const path = require("path");
const { uploadMedia, getMedia } = require("../controllers/mediaController");
const authMiddleware= require("../middlewares/authMiddleware");
const router = express.Router();

// Configure Multer to save files locally
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Multer middleware
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|mp4|pdf|docx/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      return cb(null, true);
    } else {
      cb(new Error("Unsupported file format! Only images, videos, PDF, and DOCX files are allowed."));
    }
  },
});


router.post("/upload", upload.single("file"), uploadMedia);
router.get("/media", getMedia);

module.exports = router;
