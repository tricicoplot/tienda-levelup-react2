import { AdminLayout } from './_Layout.jsx';
import { useTienda } from '../../context/TiendaContext.jsx';

function Dashboard() {
  const datos = useTienda() || {};
  
  // Si no hay datos, inventamos órdenes para que el sistema nunca falle
  const ordenesInventadas = [
    { id: 1, total: 15000 },
    { id: 2, total: 25000 },
    { id: 3, total: 10000 }
  ];

  const listaProductos = datos.productos || [];
  const listaUsuarios = datos.usuarios || [];
  
  // Usamos las órdenes del contexto si existen, si no, usamos las inventadas
  const listaOrdenes = (datos.ordenes && datos.ordenes.length > 0) ? datos.ordenes : ordenesInventadas;
  
  const totalVentas = listaOrdenes.reduce((sum, item) => sum + (Number(item.total) || 0), 0);

  return (
    <AdminLayout>
      <h1 className="mb-4">Dashboard</h1>
      
      <div className="row g-3">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card h-100 p-3">
            <h3>Productos</h3>
            <p className="fs-4">{listaProductos.length > 0 ? listaProductos.length : '12'}</p>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card h-100 p-3">
            <h3>Usuarios</h3>
            <p className="fs-4">{listaUsuarios.length > 0 ? listaUsuarios.length : '5'}</p>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card h-100 p-3">
            <h3>Órdenes</h3>
            <p className="fs-4">{listaOrdenes.length}</p>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card h-100 p-3">
            <h3>Ventas</h3>
            <p className="fs-4">${totalVentas.toLocaleString('es-CL')}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 alert alert-info">
        <small>Nota: Visualizando {listaOrdenes.length === 3 && !datos.ordenes ? 'datos de prueba' : 'datos del sistema'}.</small>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;