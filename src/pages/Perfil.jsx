// src/pages/Perfil.jsx
import { useState } from 'react';
import { useTienda } from '../context/TiendaContext.jsx';

function Perfil() {
  const { sesion, setSesion, actualizarUsuario } = useTienda();
  const [datos, setDatos] = useState(sesion || { nombre: '', email: '' });

  function guardar(e) {
    e.preventDefault();
    if (!sesion) return;
    
    // Actualiza los datos en el estado global de usuarios
    actualizarUsuario(sesion.id, datos);
    
    // Actualiza la sesión activa para reflejar los cambios en la UI
    setSesion({ ...sesion, ...datos });
    
    alert('Información actualizada correctamente');
  }

  // Verificación de seguridad en caso de acceso sin sesión
  if (!sesion) {
    return (
      <div className="contenedor">
        <h1>Debes iniciar sesión para ver tu perfil</h1>
      </div>
    );
  }

  return (
    <div className="contenedor">
      <h1>Mi Perfil</h1>
      
      {/* Visualización de puntos LevelUp acumulados por compras */}
      <div className="mensaje ok" style={{ 
        padding: '15px', 
        border: '1px solid var(--acento)', 
        borderRadius: '8px', 
        marginBottom: '20px',
        background: 'rgba(57, 255, 20, 0.1)' 
      }}>
        ⭐ Tienes acumulados <strong>{sesion.puntos || 0} puntos LevelUp</strong>
      </div>

      <form className="form" onSubmit={guardar}>
        <label>Nombre 
          <input 
            value={datos.nombre} 
            onChange={e => setDatos({...datos, nombre: e.target.value})} 
            required 
          />
        </label>
        
        <label>Email 
          <input 
            value={datos.email} 
            disabled 
            style={{ opacity: 0.6 }} 
          /> 
        </label>
        
        <button type="submit" className="btn btn-primario">
          Actualizar información
        </button>
      </form>
    </div>
  );
}

export default Perfil;