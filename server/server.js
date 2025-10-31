// server/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

const incidentsRouter = require('./routes/incidents');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Rutas
app.use('/incidents', incidentsRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.json({ ok: true, message: '🚀 API de soporte funcionando correctamente' });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor iniciado en http://localhost:${PORT}`);
});
