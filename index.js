const express = require("express");
const app = express();
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://isaquedatadev1:datadev03@bankofdata.mavbvbx.mongodb.net/api-users").then(() => {
    console.log("data")
});
const routes = require("./routes/routes")


app.use(express.json());
app.use(express.urlencoded())

app.use("/",routes);




app.listen(3000, () => {
    console.log("Lendo")
})