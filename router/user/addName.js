const express = require("express");
const router = express.Router();
const User = require("../../modules/user");

router.post("/", async (req, res) => {
    try {
        let name = req.body.name;
        let username = req.body.username;
        if(!name || !username){
            return res.status(400).send("Please provide details");
        }
        const user = new User(username);
        const names = await user.addName(name);
        res.send("added name successfully");
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

module.exports = router;
