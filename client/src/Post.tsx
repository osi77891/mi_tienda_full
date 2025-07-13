// src/Post.tsx
import React from 'react';

function Post({ cerrar }: { cerrar: () => void }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.4)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      zIndex: 9999
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        width: '400px',
        boxShadow: '0 0 10px rgba(0,0,0,0.3)'
      }}>
        <h2>Agregar nuevo producto</h2>
        <form>
          <input type="text" placeholder="Nombre del producto" style={{ width: '100%', marginBottom: '10px' }} />
          <input type="number" placeholder="Precio" style={{ width: '100%', marginBottom: '10px' }} />
          <button type="submit">Guardar</button>
          <button type="button" onClick={cerrar} style={{ marginLeft: '10px' }}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}

export default Post;
