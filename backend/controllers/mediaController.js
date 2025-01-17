const path = require("path");
const fs = require("fs");

// Upload Media File
const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const filePath = `/uploads/${req.file.filename}`;

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      filePath,
    });
  } catch (error) {
    console.error("Error uploading media:", error);
    res.status(500).json({ success: false, message: "Error uploading media" });
  }
};

// Get Uploaded Media
const getMedia = async (req, res) => {
  try {
    const mediaDirectory = path.resolve(__dirname, "../uploads");

    const files = fs.readdirSync(mediaDirectory);

    const fileList = files.map((file) => ({
      name: file,
      url: `${req.protocol}://${req.get("host")}/uploads/${file}`,
    }));

    res.status(200).json({ success: true, files: fileList });
  } catch (error) {
    console.error("Error fetching media:", error);
    res.status(500).json({ success: false, message: "Error fetching media" });
  }
};


module.exports = { uploadMedia, getMedia };