const express = require("express");
const { getDownloadURL, ref } = require("firebase/storage");
const storage = require("../../modules/firebase"); // Your Firebase storage module
const Sounds = require("../../models/sound"); // Import your Sounds model

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const sounds = await Sounds.find({});
    const downloadURLs = [];

    for (const sound of sounds) {
      const fileRef = ref(storage, `sounds/${sound.sound}`); // Construct a reference to the file
      const downloadURL = await getDownloadURL(fileRef); // Get the download URL

      downloadURLs.push({
        name: sound.title,
        downloadUrl: downloadURL, 
        _id : sound._id
      });
    }

    res.status(200).json(downloadURLs);
  } catch (error) {
    console.error("Error fetching sounds:", error);
    res.status(500).json({ error: "Failed to fetch sounds", details: error.message });
  }
});

module.exports = router;
