const express = require("express");
const app = express();
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://isaquedatadev1:datadev03@bankofdata.mavbvbx.mongodb.net/api-users").then(()=>{
    console.log("data")
});
const User = require("./models/Users");


app.use(express.json());

app.get("/users", async(req, res) => {
    const users = await User.find();
    res.json({users})

})
app.post("/addUsers",async (req,res)=>{
    const name = req.body.name
    const email = req.body.email;
    const message = req.body.message;

    const user = new User({
        nome:name,
        email:email,
        mensagem:message,
    });

    let doc = await user.save();
    res.json({user})

    
})



app.listen(3000, () => {
    console.log("Lendo")
})