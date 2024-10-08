const express = require("express");
const router = express.Router();
const QuoteService = require("../../modules/quote");

router.get("/", async (req, res) => {
    try {
        const quoteService = new QuoteService(1);
        const dailyQuote = await quoteService.getTodaysQuote();
        res.send(dailyQuote);
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

module.exports = router;
