const express = require("express");
const Sounds = require("../../models/sound"); // Import your Sounds model

const router = express.Router();


router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: "Title cannot be empty." });
  }

  try {
    const sound = await Sounds.findById(id);
    if (!sound) {
      return res.status(404).json({ error: "Sound not found." });
    }

    sound.title = title; 
    const updatedSound = await sound.save(); 

    res.status(200).json({ message: "Sound title updated successfully", sound: updatedSound });
  } catch (error) {
    console.error("Error updating sound title:", error);
    res.status(500).json({ error: "Failed to update sound title", details: error.message });
  }
});

module.exports = router;
