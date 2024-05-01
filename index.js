const express = require("express");
const app = express();
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://isaquedatadev1:datadev03@bankofdata.mavbvbx.mongodb.net/api-users").then(() => {
    console.log("data")
});
const controllers = require("./controllers/users")


app.use(express.json());

app.get("/users",controllers.usersFinder);
app.post("/addUsers",controllers.addUsers)




app.listen(3000, () => {
    console.log("Lendo")
})