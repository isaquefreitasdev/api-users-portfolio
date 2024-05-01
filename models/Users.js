const mongoose = require("mongoose")
const {Schema} = mongoose;


const User = new Schema({
    nome:{type: String,unique:false},
    email:{type:String,unique:true}
})

const modelUser = mongoose.model("user",User);


module.exports = modelUser;