const express = require("express");
const admin = require("../../modules/firebase"); // Your Firebase admin module
const Sounds = require("../../models/sound"); // Import your Sounds model

const router = express.Router();

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the sound record in MongoDB
    const sound = await Sounds.findById(id);
    if (!sound) {
      return res.status(404).json({ error: "Sound not found" });
    }

    // Create a reference to the file in Firebase Storage
    const fileRef = admin.storage().bucket().file(`sounds/${sound.sound}`);

    // Delete the file from Firebase Storage
    await fileRef.delete();

    // Remove the record from MongoDB
    await Sounds.findByIdAndDelete(id);

    res.status(200).json({ message: "Sound file deleted successfully" });
  } catch (error) {
    console.error("Error deleting sound:", error);
    res.status(500).json({ error: "Failed to delete sound", details: error.message });
  }
});

module.exports = router;
