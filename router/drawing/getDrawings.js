const express = require("express");
const Draw = require("../../models/drawing");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const images = await Draw.find({});
      
      const imageList = images.map(image => ({
        title: image.title,
        pic: image.pic, // Return the base64 string directly
        _id: image._id,
      }));
  
      res.status(200).json(imageList);
    } catch (error) {
      console.error("Error fetching images:", error);
      res.status(500).json({ error: "Failed to fetch images", details: error.message });
    }
  });
  
    module.exports = router;