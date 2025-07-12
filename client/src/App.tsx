//import React from 'react';
import logo from './assets/logo.jpg';
//import './App.css';
import React, { useState } from 'react';
import ListaProductos from './ListaProductos';
  function App() {
  const [busqueda, setBusqueda] = useState('');

  const manejarBusqueda = () => {
    alert(`Buscaste: ${busqueda}`);
  };
  return (
    <div className="App">
      <header>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src={logo} alt="Logo" style={{ width: '70px', height: '70px' }} />
        <h1> LA TIENDA TIENDA DE HALLY</h1>
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
