const express = require('express');
const admin = require('../../modules/firebase'); // Firebase Admin SDK initialized
const User = require('../../models/user'); // Your User model
const router = express.Router();

router.post('/', async (req, res) => {
  const { username, title, message } = req.body;

  if (!username || !title || !message) {
    return res.status(400).json({ message: 'Username, title, and message are required' });
  }

  try {
    const user = await User.findOne({ username });

    if (!user || !user.fcmToken) {
      return res.status(404).json({ message: 'User not found or no FCM token available' });
    }

    // Correct payload structure
    const payload = {
      notification: {
        title: title,
        body: message,
        badge: "https://frontend-ten-pi-46.vercel.app/deep.jpeg", 
      },
      webpush: {
      fcm_options: {
        link: "https://frontend-ten-pi-46.vercel.app"
      },
    },
      token: user.fcmToken, // Ensure this is set to the user's FCM token
    };

    const response = await admin.messaging().send(payload);
    res.status(200).json({ message: 'Notification sent successfully', response });
  } catch (error) {
    res.status(500).json({ message: 'Error sending notification', error });
  }
});

module.exports = router;
