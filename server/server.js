//server.js
const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Asegúrate que apunta al db.js local

const app = express();
app.use(cors());
app.use(express.json());

// server.js
app.get('/productos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos'); // 👈 usa SELECT *
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener productos:', err);
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
// POST /productos - Crear nuevo producto
app.post('/productos', async (req, res) => {
  try {
    const { nombre, venta, costo, cantidad, precio_p, categoria, fecha_v, foto } = req.body;
    const result = await pool.query(
      `INSERT INTO productos (nombre, venta, costo, cantidad, precio_p, categoria, fecha_v, foto)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [nombre, venta, costo, cantidad, precio_p, categoria, fecha_v, foto]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error del servidor al crear producto:', err);
    res.status(500).send('Error del servidor al crear producto');
  }
});

// PUT /productos/:id - Actualizar producto existente
app.put('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, venta, costo, cantidad, precio_p, categoria, fecha_v, foto } = req.body;
    const result = await pool.query(
      `UPDATE productos SET nombre=$1, venta=$2, costo=$3, cantidad=$4, precio_p=$5, categoria=$6, fecha_v=$7, foto=$8
       WHERE id=$9 RETURNING *`,
      [nombre, venta, costo, cantidad, precio_p, categoria, fecha_v, foto, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Producto no encontrado');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error del servidor al actualizar producto:', err);
    res.status(500).send('Error del servidor al actualizar producto');
  }
});

app.listen(3001, () => {
  console.log('Servidor corriendo en puerto 3001');
});
