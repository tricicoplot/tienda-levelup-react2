// src/pages/ProductoDetalle.jsx
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTienda } from '../context/TiendaContext.jsx';
import { formatearCLP } from '../utils/formato.js';

function ProductoDetalle() {
  const { codigo } = useParams();
  const { productos, agregarAlCarrito } = useTienda();
  const producto = productos.find(p => p.codigo === codigo);

  const galeria = producto?.imagenes?.length ? producto.imagenes : [producto?.imagen];
  const [imagenActiva, setImagenActiva] = useState(galeria[0]);
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  // Funcionalidad para compartir producto
  const compartirProducto = () => {
    if (navigator.share) {
      navigator.share({
        title: producto.nombre,
        text: `¡Mira este producto en Level-Up Gamer: ${producto.nombre}!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('¡Enlace copiado al portapapeles!');
    }
  };

  if (!producto) {
    return (
      <div className="contenedor">
        <h1>Producto no encontrado</h1>
        <Link to="/productos" className="btn">Volver a productos</Link>
      </div>
    );
  }

  function handleAgregar() {
    agregarAlCarrito(producto, cantidad);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  }

  return (
    <div className="contenedor">
      <Link to="/productos" className="btn btn-sm" style={{ marginBottom: 20 }}>⬅ Volver a productos</Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
        <div>
          <img src={imagenActiva} alt={producto.nombre} style={{ width: '100%', borderRadius: 12 }} onError={(e) => { e.currentTarget.src = '/logo.svg' }} />
          {galeria.length > 1 && (
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              {galeria.map((img, i) => (
                <img key={i} src={img} onClick={() => setImagenActiva(img)} style={{ width: 64, height: 64, cursor: 'pointer', border: imagenActiva === img ? '2px solid var(--acento)' : 'none' }} />
              ))}
            </div>
          )}
        </div>

        <div>
          <span className="card-cat">{producto.categoria}</span>
          <h1>{producto.nombre}</h1>
          <p>{producto.descripcion}</p>
          
          <p className="card-precio" style={{ fontSize: 24 }}>
            {producto.oferta ? formatearCLP(producto.precioOferta) : formatearCLP(producto.precio)}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <input type="number" min="1" max={producto.stock} value={cantidad} onChange={(e) => setCantidad(Math.max(1, Number(e.target.value)))} style={{ width: 60, padding: 8 }} />
            <button className="btn btn-primario" onClick={handleAgregar}>
              {agregado ? '¡Agregado!' : 'Agregar al carrito'}
            </button>
            <button className="btn" onClick={compartirProducto}>📤 Compartir</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductoDetalle;