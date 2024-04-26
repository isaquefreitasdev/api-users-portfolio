const mongoose = require("mongoose")
const {Schema} = mongoose;


const User = new Schema({
    nome:String,
    email:String,
    mensagem:String
})

const modelUser = mongoose.model("user",User);


module.exports = modelUser;