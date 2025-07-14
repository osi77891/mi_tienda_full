import logo from './assets/logo.jpg';
import React, { useState } from 'react';
import ListaProductos from './ListaProductos';
import Post from './Post';
  function App() {
  const [busqueda, setBusqueda] = useState('');
  const [mostrarPost, setMostrarPost] = useState(false);
  const manejarBusqueda = () => {
    alert(`Buscaste: ${busqueda}`);
  };
  return (
    <div className="App">
      <header>
      <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src={logo}
              alt="Logo"
              style={{
                width: '100px',
                height: '50px',
                borderRadius: '12px', // para bordes redondeados
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' // para la sombra
              }}
            />
            <h1>LA TIENDA DE HALLY BUBU</h1>
          </div>
          <button onClick={() => setMostrarPost(true)} style={{ fontSize: '16px' }}>
            ➕ Agregar
          </button>
        </div>
      </header>
      <div>
      </div>
      <main>
        <ListaProductos></ListaProductos>
      </main>
      {mostrarPost && <Post cerrar={() => setMostrarPost(false)} />}
    </div>
  );
}

export default App;
