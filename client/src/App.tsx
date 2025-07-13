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
          <button onClick={() => setMostrarPost(true)} style={{ fontSize: '16px' }}>
            ➕ Agregar
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={logo} alt="Logo" style={{ width: '100px', height: '50px' }} />
            <h1>LA TIENDA TIENDA DE HALLY</h1>
          </div>
        </div>
      </header>
      <div>
      </div>
      <main>
        <ListaProductos></ListaProductos>
      </main>
    </div>
  );
}

export default App;
