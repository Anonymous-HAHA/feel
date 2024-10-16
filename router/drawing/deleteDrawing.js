const express = require("express");
const router = express.Router();
const Draw = require("../../models/drawing");

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const image = await Draw.findById(id);
      if (!image) {
        return res.status(404).json({ error: "Image not found" });
      }
  
      // Remove the record from MongoDB
      await Draw.findByIdAndDelete(id);
  
      res.status(200).json({ message: "Image file deleted successfully" });
    } catch (error) {
      console.error("Error deleting image:", error);
      res.status(500).json({ error: "Failed to delete image", details: error.message });
    }
  });
  
  module.exports = router;