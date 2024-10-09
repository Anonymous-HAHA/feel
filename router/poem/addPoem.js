const express = require("express");
const router = express.Router();
const Poem = require("../../modules/poem");

router.post("/", async (req, res) => {
    try {
        const newpoem = req.body.poem;
        if (!newpoem) {
            return res.status(400).send("Poem is required");
        }

        const poem = new Poem();
        const  created = await poem.addPoem(newpoem);
        
        res.send({ message: "Poem added successfully"});
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

module.exports = router;
