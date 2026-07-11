import { useParams, Link } from 'react-router-dom';
import Resenas from './Resenas.jsx'; 

function BlogDetalle() {
  const { id } = useParams();

  const listaBlogs = [
    { 
      id: 'audio', 
      titulo: 'EL SECRETO DEL AUDIO', 
      contenido: 'Tener reflejos rápidos ya no es suficiente. Explora cómo los audífonos de alta fidelidad están cambiando el panorama competitivo.', 
      imagen: '/productos/AC002.jpg' 
    },
    { 
      id: 'setup', 
      titulo: 'EL DILEMA DEL SETUP', 
      contenido: 'Gráficos ultrarrealistas, tiempos de carga casi nulos y exclusividades. Desglosamos qué camino deberías tomar.', 
      imagen: '/productos/CO001.jpg' 
    },
    { 
      id: 'nube', 
      titulo: 'EL FUTURO EN LA NUBE', 
      contenido: 'Los servicios de streaming de juegos eliminan la necesidad de hardware costoso. ¿Estamos ante el fin de las consolas físicas?', 
      imagen: '/productos/PR001.jpg' 
    },
    { 
      id: 'esports', 
      titulo: 'ESPORTS: MÁS QUE UN JUEGO', 
      contenido: 'El crecimiento de las ligas profesionales está transformando la industria. Análisis sobre cómo convertirse en un jugador de élite.', 
      imagen: '/productos/AC001.jpg' 
    }
  ];

  const blogActual = listaBlogs.find(b => b.id.toLowerCase() === id?.toLowerCase());

  if (!blogActual) {
    return (
      <div style={{ padding: '40px', color: 'white', textAlign: 'center' }}>
        <h1>404 - Blog no encontrado</h1>
        <p>No existe ningún artículo con el ID: <strong>{id}</strong></p>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', color: 'white', maxWidth: '800px', margin: '0 auto' }}>
      {/* Botón de Regresar */}
      <Link to="/blog" className="btn btn-sm" style={{ marginBottom: '20px', display: 'inline-block' }}>
        ⬅ Volver al Blog
      </Link>

      <h1>{blogActual.titulo}</h1>
      <img 
        src={blogActual.imagen} 
        alt={blogActual.titulo} 
        style={{ width: '100%', borderRadius: '10px' }} 
        onError={(e) => { e.currentTarget.src = '/logo.svg' }} 
      />
      <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginTop: '20px' }}>{blogActual.contenido}</p>
      
      <div style={{ marginTop: '50px', borderTop: '1px solid #333', paddingTop: '20px' }}>
        <Resenas productoId={blogActual.id} />
      </div>
    </div>
  );
}

export default BlogDetalle;