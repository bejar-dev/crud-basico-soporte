// Rutas CRUD para incidencias
// Endpoints:
// GET    /incidents        -> listar (opcional ?q=texto para buscar en title/description)
// GET    /incidents/:id    -> obtener por id
// POST   /incidents        -> crear
// PUT    /incidents/:id    -> actualizar
// DELETE /incidents/:id    -> eliminar

const express = require('express');
const router = express.Router();
const pool = require('../db');

// Listar (con búsqueda simple)
router.get('/', async (req, res) => {
  try {
    const q = req.query.q;
    let sql = 'SELECT * FROM incidents ORDER BY created_at DESC';
    let params = [];
    if (q) {
      sql = 'SELECT * FROM incidents WHERE title LIKE ? OR description LIKE ? ORDER BY created_at DESC';
      params = [`%${q}%`, `%${q}%`];
    }
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error(err.stack || err);
    // En entorno de desarrollo devolvemos detalle para depuración local
    res.status(500).json({ error: 'Error al listar incidencias', detail: err.message });
  }
});

// Obtener por id
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query('SELECT * FROM incidents WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Incidencia no encontrada' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err.stack || err);
    res.status(500).json({ error: 'Error al obtener incidencia', detail: err.message });
  }
});

// Crear
router.post('/', async (req, res) => {
  try {
    const { title, description, status, customer_name, customer_phone } = req.body;
    const [result] = await pool.query(
      'INSERT INTO incidents (title, description, status, customer_name, customer_phone) VALUES (?,?,?,?,?)',
      [title, description, status || 'abierta', customer_name, customer_phone]
    );
    const insertedId = result.insertId;
    const [rows] = await pool.query('SELECT * FROM incidents WHERE id = ?', [insertedId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err.stack || err);
    res.status(500).json({ error: 'Error al crear incidencia', detail: err.message });
  }
});

// Actualizar
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, status, customer_name, customer_phone } = req.body;
    await pool.query(
      'UPDATE incidents SET title=?, description=?, status=?, customer_name=?, customer_phone=? WHERE id=?',
      [title, description, status, customer_name, customer_phone, id]
    );
    const [rows] = await pool.query('SELECT * FROM incidents WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Incidencia no encontrada' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err.stack || err);
    res.status(500).json({ error: 'Error al actualizar incidencia', detail: err.message });
  }
});

// Eliminar
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query('DELETE FROM incidents WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err.stack || err);
    res.status(500).json({ error: 'Error al eliminar incidencia', detail: err.message });
  }
});

module.exports = router;
