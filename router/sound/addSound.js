const express = require("express");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const admin = require("../../modules/firebase");
const Sounds = require("../../models/sound");

const router = express.Router();

ffmpeg.setFfmpegPath(ffmpegPath);

const storageConfig = multer.memoryStorage();
const upload = multer({
  storage: storageConfig,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'audio/mpeg',
      'audio/mp4',
      'audio/x-m4a',
      'audio/wav',
      'audio/ogg',
      'audio/flac',
      'audio/aac',
      'audio/x-ms-wma'
    ];
    const isValid = allowedTypes.includes(file.mimetype);
    cb(null, isValid);
  },
});

router.post("/", upload.single("soundFile"), async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded or file type not supported" });
    }

    const uniqueName = `${Date.now()}_${req.file.originalname}`;

    // Convert to MP3
    ffmpeg()
      .input(req.file.buffer)
      .toFormat("mp3")
      .on("error", (err) => {
        console.error("Error converting file:", err);
        res.status(500).json({ error: "Error converting file", details: err.message });
      })
      .on("end", async () => {
        const bucket = admin.storage().bucket();
        const fileUpload = bucket.file(`sounds/${uniqueName}`);

        // Upload converted file
        await fileUpload.save(convertedFile, {
          contentType: "audio/mpeg",
          metadata: {
            firebaseStorageDownloadTokens: uniqueName,
          },
        });

        const sound = new Sounds({ title, sound: uniqueName });
        await sound.save();

        res.status(200).json({ message: "File uploaded successfully", uniqueName });
      })
      .pipe();

  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: "Failed to process file", details: error.message });
  }
});

module.exports = router;
