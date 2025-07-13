//server.js
const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Asegúrate que apunta al db.js local

const app = express();
app.use(cors());
app.use(express.json());

app.get('/productos', async (req, res) => {
  try {
    //const result = await pool.query('SELECT id, nombre, venta, foto FROM productos');
    const result = await pool.query('SELECT * FROM productos');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener productos:', err); // 🔥 muestra el error completo
  res.status(500).send('Error del servidor');
  }
});
app.get('/productos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).send('Producto no encontrado');
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener producto:', err);
    res.status(500).send('Error del servidor');
  }
});

app.listen(3001, () => {
  console.log('Servidor corriendo en puerto 3001');
});
