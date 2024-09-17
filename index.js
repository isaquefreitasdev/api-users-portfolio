require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const path = require('path');
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
app.use(express.json());

// Servir arquivos estáticos da pasta 'views/public'
app.use('/public', express.static(path.join(__dirname, 'views', 'public')));

// Configurar as rotas da API
app.use("/api", routes);

// Servir o arquivo HTML principal para todas as outras rotas
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'public'));
});

// Exporta o app para a Vercel tratar
module.exports = app;

// Adicione um bloco para iniciar o servidor localmente (opcional)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
