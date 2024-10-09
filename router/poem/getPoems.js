const express = require("express");
const router = express.Router();
const Poem = require("../../modules/poem");

router.get("/", async (req, res) => {
    try {
 
        const poem = new Poem();
        const poems = await poem.getAllPoems();
        res.send(poems);
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

module.exports = router;
