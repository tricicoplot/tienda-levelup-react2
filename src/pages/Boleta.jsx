import { useParams, Link } from 'react-router-dom'
import { useTienda } from '../context/TiendaContext.jsx'
import { formatearCLP, fechaCorta } from '../utils/formato.js'

function Boleta() {
  const { id } = useParams()
  const { ordenes } = useTienda()
  const orden = ordenes.find(o => o.id === Number(id))

  if (!orden) return <div><h1>Boleta no encontrada</h1><Link to="/" className="btn">Ir al inicio</Link></div>

  return (
    <>
      <div className="mensaje ok">✅ ¡Pago exitoso! Gracias por tu compra.</div>
      <h1>Boleta N° {orden.id}</h1>
      <p>Fecha: {fechaCorta(orden.fecha)}</p>
      <p>Cliente: <strong>{orden.cliente.nombre}</strong> · {orden.cliente.email}</p>
      <p>Dirección: {orden.cliente.direccion}, {orden.cliente.ciudad}</p>
      <p>Pago: {orden.pago.tarjeta}</p>
      <table className="tabla" style={{ marginTop: 20 }}>
        <thead><tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th></tr></thead>
        <tbody>
          {orden.items.map((i, idx) => (
            <tr key={idx}>
              <td>{i.nombre}</td>
              <td>{formatearCLP(i.precio)}</td>
              <td>{i.cantidad}</td>
              <td>{formatearCLP(i.precio * i.cantidad)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 style={{ textAlign: 'right', marginTop: 20 }}>Total: <span style={{ color: 'var(--acento)' }}>{formatearCLP(orden.total)}</span></h2>
      <Link to="/productos" className="btn btn-primario">Seguir comprando</Link>
    </>
  )
}
export default Boleta
