import { Link } from 'react-router-dom'
import { formatearCLP } from '../utils/formato.js'

function ProductoCard({ producto }) {
  return (
    <Link to={`/productos/${producto.codigo}`} className="card" style={{ position: 'relative' }}>
      {producto.oferta && (
        <span className="badge" style={{ position: 'absolute', top: 8, left: 8, borderColor: 'var(--peligro)', color: 'var(--peligro)', zIndex: 1 }}>
          OFERTA
        </span>
      )}
      <img src={producto.imagen} alt={producto.nombre} onError={(e) => { e.currentTarget.src = '/logo.svg' }} />
      <div className="card-body">
        <span className="card-cat">{producto.categoria}</span>
        <span className="card-nombre">{producto.nombre}</span>
        {producto.oferta ? (
          <span>
            <span style={{ textDecoration: 'line-through', color: 'var(--muted)', fontSize: 13, marginRight: 6 }}>
              {formatearCLP(producto.precio)}
            </span>
            <span className="card-precio">{formatearCLP(producto.precioOferta)}</span>
          </span>
        ) : (
          <span className="card-precio">{formatearCLP(producto.precio)}</span>
        )}
      </div>
    </Link>
  )
}
export default ProductoCard
