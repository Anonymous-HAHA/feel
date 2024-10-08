const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quoteSchema = new Schema({

  batch: { type: Number, required: true, unique: true },
    happy: [{ text: String, image: String }],
    sad: [{ text: String, image: String }],
    angry: [{ text: String, image: String }],
    frustrated: [{ text: String, image: String }],
    demotivated: [{ text: String, image: String }]
});

const Quotes = mongoose.model("Quote", quoteSchema);
module.exports = Quotes;
