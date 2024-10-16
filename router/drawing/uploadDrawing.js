const express = require("express");
const Draw = require("../../models/drawing");
const router = express.Router();

// Upload image endpoint
router.post("/", async (req, res) => {
  try {
    const { title, imageBase64 } = req.body;

    // Validate input
    if (!title || !imageBase64) {
      return res.status(400).json({ error: "Title and image data are required" });
    }

    // Create a new image record
    const newImage = new Draw({ title, pic: imageBase64 });
    await newImage.save();

    res.status(200).json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Failed to upload image", details: error.message });
  }
});

module.exports = router;
