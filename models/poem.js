const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const poemSchema = new Schema({

    poem:  {type : String}
});

const Poem = mongoose.model("Poem", poemSchema);
module.exports = Poem;
