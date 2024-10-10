const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const soundsSchema = new Schema({

    sound:  {type : String , required : true  , unique : true}, 
    title: {type : String , required : true},
});

const Sounds = mongoose.model("Sounds", soundsSchema);
module.exports = Sounds;
