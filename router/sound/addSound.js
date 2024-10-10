const express = require("express");
const multer = require("multer");
const { ref, uploadBytes} = require("firebase/storage");
const storage = require("../../modules/firebase");
const Sounds = require("../../models/sound");

const router = express.Router();

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
    if (isValid) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only audio files are allowed."));
    }
  },
});

router.post("/", upload.single("soundFile"), async (req, res) => {
  try {
    const { title } = req.body;
    if(!title){
        return res.status(400).json({ error: "Title is required" });
        }
    if (!req.file ) {
      return res.status(400).json({ error: "No file uploaded or file type not supported" });
    }

    const file = req.file;
    const uniqueName = `${Date.now()}_${file.originalname}`; // Generate unique name
    const storageRef = ref(storage, `sounds/${uniqueName}`);


    await uploadBytes(storageRef, file.buffer);

    // Save the unique name in MongoDB
    const sound = new Sounds({ 
        title,
      sound: uniqueName 
    });
    await sound.save();

    res.status(200).json({ message: "File uploaded successfully", uniqueName });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Failed to upload file", details: error.message });
  }
});

module.exports = router;
