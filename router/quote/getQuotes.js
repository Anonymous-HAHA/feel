const express = require("express");
const router = express.Router();
const QuoteService = require("../../modules/quote");

router.get("/random", async (req, res) => {
    try {
        const { mood } = req.query;
        if (!mood) {
            return res.status(400).send("Mood parameter is required");
        }

        const quoteService = new QuoteService(1);
        const randomQuote = await quoteService.getRandomQuote(mood);
        res.send(randomQuote);
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

module.exports = router;
