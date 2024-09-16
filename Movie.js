const mongoose = require("mongoose")
const { Schema } = mongoose;
const validator = require("validator");


const MovieSchema = new Schema({
    title:{
        required:true,
        type:String,
    },
    description:{
        required:true,
        type:String
    }
})
const Movie = mongoose.model("Movies",MovieSchema)
module.exports = Movie
