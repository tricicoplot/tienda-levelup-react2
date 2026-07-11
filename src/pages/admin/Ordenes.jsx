import { AdminLayout } from './_Layout.jsx'
import { useTienda } from '../../context/TiendaContext.jsx'
import { formatearCLP, fechaCorta } from '../../utils/formato.js'

function AdminOrdenes() {
  const { ordenes, actualizarEstadoOrden } = useTienda()
  return (
    <AdminLayout>
      <h1>Órdenes</h1>
      {ordenes.length === 0 ? <p>No hay órdenes registradas.</p> : (
        <table className="tabla">
          <thead><tr><th>N°</th><th>Fecha</th><th>Cliente</th><th>Items</th><th>Total</th><th>Estado</th></tr></thead>
          <tbody>
            {ordenes.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{fechaCorta(o.fecha)}</td>
                <td>{o.cliente.nombre}</td>
                <td>{o.items.reduce((s, i) => s + i.cantidad, 0)}</td>
                <td>{formatearCLP(o.total)}</td>
                <td>
                  <select value={o.estado} onChange={e => actualizarEstadoOrden(o.id, e.target.value)} className="btn btn-sm">
                    <option value="pagada">Pagada</option>
                    <option value="enviada">Enviada</option>
                    <option value="entregada">Entregada</option>
                    <option value="cancelada">Cancelada</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  )
}
export default AdminOrdenes
