import { AdminLayout } from './_Layout.jsx'
import { useTienda } from '../../context/TiendaContext.jsx'

function Dashboard() {
  const { productos, usuarios, ordenes } = useTienda()
  
  // Protección añadida para evitar TypeError en reduce
  const total = (ordenes || []).reduce((s, o) => s + (Number(o.total) || 0), 0)
  
  return (
    <AdminLayout>
      <h1>Dashboard</h1>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
        <div className="card" style={{ padding: 20 }}>
            <h3>Productos</h3>
            <p>{productos?.length || 0}</p>
        </div>
        <div className="card" style={{ padding: 20 }}>
            <h3>Usuarios</h3>
            <p>{usuarios?.length || 0}</p>
        </div>
        <div className="card" style={{ padding: 20 }}>
            <h3>Órdenes</h3>
            <p>{ordenes?.length || 0}</p>
        </div>
        <div className="card" style={{ padding: 20 }}>
            <h3>Ventas</h3>
            <p>${total.toLocaleString('es-CL')}</p>
        </div>
      </div>
    </AdminLayout>
  )
}
export default Dashboard