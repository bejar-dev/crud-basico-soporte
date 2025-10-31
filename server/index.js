const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Rutas
const incidentsRouter = require('./routes/incidents');
const authRouter = require('./routes/auth');

app.use('/incidents', incidentsRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.json({ ok: true, msg: 'API funcionando correctamente' });
});

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
