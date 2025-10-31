// server/db.js
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',       // o el usuario de tu MySQL
  password: '',       // pon tu contraseña si tu XAMPP la tiene
  database: 'crud_soporte' // ⚠️ aquí debe ir tu base actual
});

(async () => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    console.log('✅ Conectado a la base de datos MySQL correctamente.');
  } catch (err) {
    console.error('❌ Error al conectar a la base de datos:', err.message);
  }
})();

module.exports = db;
