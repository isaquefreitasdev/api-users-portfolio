require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const path = require('path');
const routes = require("./routes/routes");

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.use(cors());
app.use(express.json());


app.use("/api", routes);



module.exports = app;


