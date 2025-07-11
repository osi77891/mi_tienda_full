import React, { useState, useEffect } from 'react';
import './TablaProductos.css';

interface Producto {
  id: number;
  nombre: string;
  venta: number;
  foto: string;
}

function ListaProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/productos')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error('Error:', err));
  }, []);

  // 🔍 Filtrar productos por coincidencia parcial en el nombre
  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          padding: '10px',
          fontSize: '16px',
          marginBottom: '20px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          width: '100%',
          maxWidth: '300px'
        }}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Venta</th>
            <th>Foto</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.venta}</td>
              <td>
                <img src={p.foto} alt={p.nombre} className="producto-img" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaProductos;
