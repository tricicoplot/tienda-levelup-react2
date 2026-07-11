import { AdminLayout } from './_Layout.jsx'
import { useTienda } from '../../context/TiendaContext.jsx'
import { formatearCLP } from '../../utils/formato.js'

function AdminReportes() {
  const { ordenes, productos } = useTienda()
  const total = ordenes.reduce((s, o) => s + o.total, 0)

  const ventasPorProducto = {}
  ordenes.forEach(o => o.items.forEach(i => {
    ventasPorProducto[i.codigo] = (ventasPorProducto[i.codigo] || 0) + i.cantidad
  }))
  const top = Object.entries(ventasPorProducto)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([codigo, cantidad]) => ({ ...productos.find(p => p.codigo === codigo), cantidad }))

  return (
    <AdminLayout>
      <h1>Reportes de ventas</h1>
      <div className="mensaje">Total facturado: <strong style={{ color: 'var(--acento)' }}>{formatearCLP(total)}</strong> en <strong>{ordenes.length}</strong> órdenes</div>
      <h2>Top 5 productos vendidos</h2>
      {top.length === 0 ? <p>Sin datos aún.</p> : (
        <table className="tabla">
          <thead><tr><th>Producto</th><th>Categoría</th><th>Unidades vendidas</th></tr></thead>
          <tbody>
            {top.map((p, i) => (
              <tr key={i}><td>{p?.nombre || '—'}</td><td>{p?.categoria || '—'}</td><td>{p.cantidad}</td></tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  )
}
export default AdminReportes
