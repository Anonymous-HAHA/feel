const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const User = require("../../models/user");


router.get("/", async (req, res) => {
    res.send("registration page");
  });

function isFormComplete(req, res, next) {
  let body = req.body;
  if (
    body.username &&
    body.password 
  ) {
    next();
  } else {
    return res.status(400).send("Please fill the details");
  }
}
router.post("/", isFormComplete, async (req, res) => {
  let body = req.body;
  try{
      let username = body.username;
      let user = await User.findOne({ username });
      if (user) {
        return res.status(400).send("User already exists");
      }

    const EncryptedPass = CryptoJS.AES.encrypt(
      body.password,
      process.env.SECRET_KEY
    ).toString();

    let newUser = new User({
      username: body.username,
      password: EncryptedPass,
    });
    await newUser.save();
    res.send("User registered successfully");
    }
    catch (error) {
        return res.status(400).send(error.message);
      }
});
module.exports = router;
