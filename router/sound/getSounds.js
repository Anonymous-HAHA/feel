const express = require("express");
const admin = require("../../modules/firebase"); // Your Firebase admin module
const Sounds = require("../../models/sound"); // Import your Sounds model

const router = express.Router();

// This endpoint fetches the list of sounds without public URLs
router.get("/", async (req, res) => {
  try {
    const sounds = await Sounds.find({});
    
    const soundList = sounds.map(sound => ({
      name: sound.title,
      _id: sound._id
    }));

    res.status(200).json(soundList);
  } catch (error) {
    console.error("Error fetching sounds:", error);
    res.status(500).json({ error: "Failed to fetch sounds", details: error.message });
  }
});

// Endpoint to download sound files directly
router.get("/download/:id", async (req, res) => {
  try {
    const sound = await Sounds.findById(req.params.id);
    if (!sound) {
      return res.status(404).json({ error: "Sound not found" });
    }

    const fileRef = admin.storage().bucket().file(`sounds/${sound.sound}`);
    const fileStream = fileRef.createReadStream();
    // const sanitizedFileName = encodeURIComponent(sound.title);

    res.set({
      "Content-Type": "audio/mpeg", // Set the content type accordingly
      "Content-Disposition": `attachment; filename="file"`, // Prompt for download
    });

    // Pipe the file stream to the response
    fileStream.pipe(res);

    // Handle stream errors
    fileStream.on('error', (error) => {
      console.error("Error streaming file:", error);
      res.status(500).json({ error: "Failed to stream sound", details: error.message });
    });

    // Handle stream end
    fileStream.on('end', () => {
      // console.log("File stream ended successfully.");
    });

  } catch (error) {
    console.error("Error downloading sound:", error);
    res.status(500).json({ error: "Failed to download sound", details: error.message });
  }
});

module.exports = router;
