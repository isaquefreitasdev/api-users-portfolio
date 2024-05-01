const express = require("express");
const app = express();
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://isaquedatadev1:datadev03@bankofdata.mavbvbx.mongodb.net/api-users").then(() => {
    console.log("data")
});
const User = require("./models/Users");



const usersFinder = async (req,res) => {
    const users = await User.find();
    res.json({ users });
}

module.exports = {usersFinder}
