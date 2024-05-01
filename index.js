const express = require("express");
const app = express();
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://isaquedatadev1:datadev03@bankofdata.mavbvbx.mongodb.net/api-users").then(() => {
    console.log("data")
});
const User = require("./models/Users");
const controllers = require("./controllers/users")


app.use(express.json());

app.get("/users",controllers.usersFinder());
app.post("/addUsers", async (req, res) => {
    const name = req.body.name
    const email = req.body.email;
    const message = req.body.message;
    try {
        if (name === '' || email === "" || message === '') {
            res.json({ error: "Preencha todos os campos" })
        } else {
            const user = new User({
                nome: name,
                email: email,
                mensagem: message,
            });
            let doc = await user.save();
            res.json({ user })


        }
    } catch (error) {
        res.json({error:error})
    }
})




app.listen(3000, () => {
    console.log("Lendo")
})