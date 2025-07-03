//import React from 'react';
import logo from './logo.svg';
//import './App.css';
import React, { useState } from 'react';

  function App() {
  const [busqueda, setBusqueda] = useState('');

  const manejarBusqueda = () => {
    alert(`Buscaste: ${busqueda}`);
  };
  return (
    <div className="App">
      <header>
        <h1> ESTA ES LA CABECERA</h1>
      </header>
      <div>
        <input
        type="text"
        placeholder="Buscar..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          padding: '10px',
          fontSize: '16px',
          marginRight: '10px',
          borderRadius: '8px',
          border: '1px solid #ccc'
        }}
      />
      <button
        onClick={manejarBusqueda}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '8px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Buscar
      </button>
      </div>
      <main>
        <p>este es el cuerpo</p>
      </main>
    </div>
  );
}

export default App;
