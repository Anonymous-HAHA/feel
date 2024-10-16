const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const drawingSchema = new Schema({

    pic:  {type : String , required : true  , unique : true}, 
    title: {type : String , required : true},
});

const Draw = mongoose.model("Pics", drawingSchema);
module.exports = Draw;
