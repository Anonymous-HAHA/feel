const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dailyQuoteSchema = new Schema({

  batch: { type: Number, required: true, unique: true },
    today:  {type : String}
});

const DailyQuote = mongoose.model("DailyQuote", dailyQuoteSchema);
module.exports = DailyQuote;
