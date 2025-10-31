// server/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs'); // 👈 asegúrate de tener instalado bcryptjs
const db = require('../db');
const router = express.Router();

// =========================
// 📦 Registro de usuario
// =========================
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  try {
    // Encriptar la contraseña
    const hashed = await bcrypt.hash(password, 10);

    // Guardar en la base de datos
    await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashed]
    );

    res.json({ message: '✅ Usuario registrado correctamente' });
  } catch (err) {
    console.error('Error al registrar usuario:', err);

    if (err.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'El correo ya está registrado' });
    } else {
      res.status(500).json({ error: 'Error del servidor' });
    }
  }
});

// =========================
// 🔑 Inicio de sesión
// =========================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Debe ingresar correo y contraseña' });

  try {
    // Buscar usuario
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!rows.length) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const user = rows[0];

    // Comparar contraseñas
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Enviar datos del usuario
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;
