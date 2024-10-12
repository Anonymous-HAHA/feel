const express = require("express");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const admin = require("../../modules/firebase");
const Sounds = require("../../models/sound");
const tmp = require("tmp");
const fs = require("fs");

const router = express.Router();
ffmpeg.setFfmpegPath(ffmpegPath);

const storageConfig = multer.memoryStorage();
const upload = multer({
  storage: storageConfig,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'audio/mpeg', 'audio/mp4', 'audio/x-m4a', 'audio/wav', 'audio/ogg', 'audio/flac', 'audio/aac', 'audio/x-ms-wma'
    ];
    cb(null, allowedTypes.includes(file.mimetype));
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

    const uniqueName = `${Date.now()}_${req.file.originalname}.mp3`;
    const tempFile = tmp.fileSync();

    fs.writeFileSync(tempFile.name, req.file.buffer);

    ffmpeg(tempFile.name)
      .toFormat("mp3")
      .on("error", (err) => {
        console.error("Error converting file:", err);
        res.status(500).json({ error: "Error converting file", details: err.message });
      })
      .on("end", async () => {
        fs.readFile(tempFile.name, async (err, convertedFile) => {
          if (err) {
            return res.status(500).json({ error: "Error reading converted file", details: err.message });
          }

          const bucket = admin.storage().bucket();
          const fileUpload = bucket.file(`sounds/${uniqueName}`);

          await fileUpload.save(convertedFile, {
            contentType: "audio/mpeg",
            metadata: {
              firebaseStorageDownloadTokens: uniqueName,
            },
          });

          tempFile.removeCallback(); // Clean up temporary file

          const sound = new Sounds({ title, sound: uniqueName });
          await sound.save();

          res.status(200).json({ message: "File uploaded successfully", uniqueName });
        });
      })
      .save(tempFile.name);
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: "Failed to process file", details: error.message });
  }
});

module.exports = router;
