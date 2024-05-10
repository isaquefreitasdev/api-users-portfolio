require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("data")
});
const routes = require("./routes/routes")
const cors = require("cors");

app.use(cors())
app.use(express.urlencoded())
app.use(express.json());


app.use("/",routes);




app.listen(3001, () => {
    console.log("Lendo")
})