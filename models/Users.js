const mongoose = require("mongoose")
const {Schema} = mongoose;


const User = new Schema({
    name:{type: String,unique:false},
    email:{type:String,unique:true},
    message:{type:String,unique:false}
})

const modelUser = mongoose.model("user",User);


module.exports = modelUser;