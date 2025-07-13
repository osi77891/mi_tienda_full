// src/Post.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Producto = {
  id?: string;
  nombre: string;
  venta: string;
  costo: string;
  cantidad: string;
  precio_p: string;
  categoria: string;
  fecha_v: string;
  foto?: string;
};

function Post({ cerrar }: { cerrar: () => void }) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [form, setForm] = useState<Producto>({
    id: '',
    nombre: '',
    venta: '',
    costo: '',
    cantidad: '',
    precio_p: '',
    categoria: '',
    fecha_v: '',
    foto: ''
  });

  // ✅ Cargar lista de productos (para select)
  useEffect(() => {
    axios
      .get<Producto[]>('http://localhost:3001/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error(err));
  }, []);
  

  // ✅ Cargar datos de producto seleccionado
  const seleccionarProducto = async (id: string) => {
    if (!id) {
      setForm({
        id: '',
        nombre: '',
        venta: '',
        costo: '',
        cantidad: '',
        precio_p: '',
        categoria: '',
        fecha_v: '',
        foto: ''
      });
      return;
    }

    try {
        const res = await axios.get<Producto>(`http://localhost:3001/productos/${id}`);

      setForm(res.data);
    } catch (error) {
      console.error(error);
      alert('Error al cargar el producto');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { id, nombre, venta, costo, cantidad, precio_p, categoria, fecha_v } = form;
    if (!nombre || !venta || !costo || !cantidad || !precio_p || !categoria || !fecha_v) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    try {
      if (form.id && productos.some(p => p.id === form.id)) {
        // Actualizar
        await axios.put(`http://localhost:3001/productos/${form.id}`, form);
        alert('Producto actualizado');
      } else {
        // Insertar
        const nuevoForm = { ...form };
        delete nuevoForm.id;
        await axios.post('http://localhost:3001/productos', nuevoForm);
        alert('Producto agregado');
      }

      cerrar(); // Cierra la ventana
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error al guardar el producto.');
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.4)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      zIndex: 9999
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        width: '450px',
        boxShadow: '0 0 10px rgba(0,0,0,0.3)'
      }}>
        <h2>{form.id && productos.some(p => p.id === form.id) ? 'Actualizar Producto' : 'Agregar Producto'}</h2>

        <form onSubmit={handleSubmit}>
          <label>ID (elige para editar o deja vacío para nuevo)</label>
          <select
            name="id"
            value={form.id}
            onChange={async (e) => {
              const id = e.target.value;
              setForm(prev => ({ ...prev, id }));
              await seleccionarProducto(id);
            }}
            style={{ width: '100%' }}
          >
            <option value="">Nuevo producto</option>
            {productos.map(p => (
              <option key={p.id} value={p.id}>
                {p.id} - {p.nombre}
              </option>
            ))}
          </select>


          <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required style={{ width: '100%', marginTop: '10px' }} />
          <input name="venta" placeholder="Venta" value={form.venta} onChange={handleChange} required style={{ width: '100%', marginTop: '10px' }} />
          <input name="costo" placeholder="Costo" value={form.costo} onChange={handleChange} required style={{ width: '100%', marginTop: '10px' }} />
          <input name="cantidad" placeholder="Cantidad" value={form.cantidad} onChange={handleChange} required style={{ width: '100%', marginTop: '10px' }} />
          <input name="precio_p" placeholder="Precio Público" value={form.precio_p} onChange={handleChange} required style={{ width: '100%', marginTop: '10px' }} />
          <input name="categoria" placeholder="Categoría" value={form.categoria} onChange={handleChange} required style={{ width: '100%', marginTop: '10px' }} />
          <input name="fecha_v" type="date" placeholder="Fecha Vencimiento" value={form.fecha_v} onChange={handleChange} required style={{ width: '100%', marginTop: '10px' }} />
          <input name="foto" placeholder="Link de la Foto (opcional)" value={form.foto} onChange={handleChange} style={{ width: '100%', marginTop: '10px' }} />

          <div style={{ marginTop: '15px' }}>
            <button type="submit">
              {form.id && productos.some(p => p.id === form.id) ? 'Actualizar' : 'Guardar'}
            </button>
            <button type="button" onClick={cerrar} style={{ marginLeft: '10px' }}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Post;
