const express = require("express");
const router = express.Router();
const User = require("../../modules/user");

router.get("/", async (req, res) => {
    try {
        let username = req.username;
        const user = new User(username);
        const randomName = await user.getRandomName();
        res.send(randomName);
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

module.exports = router;
