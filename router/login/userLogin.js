const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

function isFormComplete(req, res, next) {
  let body = req.body;
  if (
    body.username &&
    body.password 
  ) {
    next();
  } else {
    res.status(400).send("Please fill the details");
  }
}

router.get("/", async (req, res) => {
  res.send("Login page");
});

router.post("/", isFormComplete, async (req, res) => {
  let body = req.body;
  try {
    let username = body.username;
    let role = (username==='admin')?'admin':'user';
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(400).send("User Doesn't exists");
    }

    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    const isPasswordMatched = body.password == decryptedPassword;

    if (isPasswordMatched) {
      const payload = { username };
      const jwtToken = jwt.sign(payload, process.env.JWT_SECRET_KEY);
      res.json({ jwtToken, role }); 
    } else {
      return res.status(400).send("Invalid Password");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
});

module.exports = router;