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
app.use("/",express.json(),routes);




app.listen(3001, () => {
    console.log("Lendo")
})