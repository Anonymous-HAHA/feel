const express = require("express");
const router = express.Router();
const User = require("../../modules/user");

router.post("/", async (req, res) => {
    try {
        let username = req.username;
        const user = new User(username);
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).send("Please provide details");
        }
        const updatedUser = await user.changePassword(oldPassword, newPassword);
        res.send("updated User password");
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

module.exports = router;
