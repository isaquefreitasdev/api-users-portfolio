require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const routes = require("./routes/routes");

// Conectando ao MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Middlewares
app.use(cors());
app.use("/", express.json(), routes);

// Exporta o app para a Vercel tratar
module.exports = app;
