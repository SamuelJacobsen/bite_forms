const express = require('express');
const admin = require("firebase-admin");

// Importe as rotas usando require em vez de import
const formsRoutes = require('./routes/FormsRoutes');

const app = express();
admin.initializeApp({
  credential: admin.credential.cert("key.json")
});

// Middleware para processar corpos de solicitação JSON
app.use(express.json());

// Rotas
app.use('/bite', formsRoutes); 

// Inicialize o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
