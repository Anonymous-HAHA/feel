const express = require('express');
const User = require('../../models/user');
const router = express.Router();

// Route to register FCM Token
router.post('/', async (req, res) => {
    const username  = req.username;
    const { fcmToken } = req.body;
  
    try {
      const user = await User.findOneAndUpdate(
        { username },
        { fcmToken },
        { upsert: true, new: true }
      );
      
      res.status(200).json({ message: 'Token registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering token', error });
    }
  });

module.exports = router;
