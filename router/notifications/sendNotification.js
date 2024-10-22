const express = require('express');
const admin = require('../../modules/firebase'); // Firebase Admin SDK initialized
const User = require('../../models/user'); // Your User model
const router = express.Router();

router.post('/', async (req, res) => {
    // const username = req.username;
    const { username , title, message } = req.body;
  
    try {
      const user = await User.findOne({ username });
  
      if (!user || !user.fcmToken) {
        return res.status(404).json({ message: 'User not found or no FCM token available' });
      }
  
      const payload = {
        notification: {
          title: title,
          body: message,
        },
        token: user.fcmToken,
      };
  
      const response = await admin.messaging().send(payload);
      res.status(200).json({ message: 'Notification sent successfully', response });
    } catch (error) {
      res.status(500).json({ message: 'Error sending notification', error });
    }
  });

module.exports = router;
