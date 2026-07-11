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
        {/* Galería de imágenes */}
        <div>
          <img
            src={imagenActiva}
            alt={producto.nombre}
            style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 12, border: '1px solid var(--borde)' }}
            onError={(e) => { e.currentTarget.src = '/logo.svg' }}
          />
          {galeria.length > 1 && (
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              {galeria.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${producto.nombre} vista ${i + 1}`}
                  onClick={() => setImagenActiva(img)}
                  onError={(e) => { e.currentTarget.src = '/logo.svg' }}
                  style={{
                    width: 64, height: 64, objectFit: 'cover', borderRadius: 8, cursor: 'pointer',
                    border: imagenActiva === img ? '2px solid var(--acento)' : '2px solid transparent',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div>
          <span className="card-cat">{producto.categoria}</span>
          {producto.oferta && <span className="badge" style={{ marginLeft: 8, borderColor: 'var(--peligro)', color: 'var(--peligro)' }}>OFERTA</span>}
          <h1 style={{ margin: '8px 0 4px' }}>{producto.nombre}</h1>
          <p style={{ color: 'var(--muted)', fontSize: 13 }}>Código: {producto.codigo}</p>
          <p>{producto.descripcion}</p>

          {producto.oferta ? (
            <p style={{ fontSize: 24 }}>
              <span style={{ textDecoration: 'line-through', color: 'var(--muted)', marginRight: 10 }}>{formatearCLP(producto.precio)}</span>
              <strong style={{ color: 'var(--acento)' }}>{formatearCLP(producto.precioOferta)}</strong>
            </p>
          ) : (
            <p className="card-precio" style={{ fontSize: 24 }}>{formatearCLP(producto.precio)}</p>
          )}

          {/* Ficha técnica */}
          <table className="tabla" style={{ marginBottom: 20 }}>
            <tbody>
              <tr><th>Fabricante</th><td>{producto.fabricante || 'No especificado'}</td></tr>
              <tr><th>Categoría</th><td>{producto.categoria}</td></tr>
              <tr><th>Garantía</th><td>{producto.garantia || 'No especificada'}</td></tr>
              <tr><th>Disponibilidad</th><td>{producto.stock > 0 ? `${producto.stock} unidades` : 'Sin stock'}</td></tr>
            </tbody>
          </table>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <input
              type="number"
              min="1"
              max={producto.stock}
              value={cantidad}
              onChange={(e) => setCantidad(Math.max(1, Number(e.target.value)))}
              disabled={producto.stock === 0}
              style={{ width: 70, padding: 10, borderRadius: 8, border: '1px solid var(--borde)', background: 'var(--panel2)', color: 'var(--texto)' }}
            />
            <button className="btn btn-primario" onClick={handleAgregar} disabled={producto.stock === 0}>
              {producto.stock === 0 ? 'Sin stock' : agregado ? '¡Agregado!' : 'Agregar al carrito'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductoDetalle;
