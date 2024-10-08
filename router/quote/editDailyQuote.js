const express = require("express");
const router = express.Router();
const QuoteService = require("../../modules/quote");

router.post("/", async (req, res) => {
    try {
        const { quote } = req.body;
        if(!quote) {
            return res.status(400).send("Quote is required");
        }
        const quoteService = new QuoteService(1);
        const dailyQuote = await quoteService.editTodaysQuote(quote);
        res.send("successfully edited the quote");
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

module.exports = router;
