import { useTienda } from '../../context/TiendaContext.jsx';
import { Link } from 'react-router-dom';
import { AdminLayout } from './_Layout.jsx';
import { formatearCLP } from '../../utils/formato.js';

function AdminProductos() {
  const { productos, eliminarProducto } = useTienda();

  return (
    <AdminLayout>
      <h1>Gestión de Productos</h1>
      <Link to="/admin/productos/nuevo" className="btn btn-primario" style={{ marginBottom: 16, display: 'inline-block' }}>
        Nuevo Producto
      </Link>

      <table className="tabla">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => {
            const stockBajo = p.stock <= (p.stockCritico ?? 0);
            return (
              <tr key={p.codigo}>
                <td>{p.codigo}</td>
                <td>{p.nombre}</td>
                <td>{p.categoria}</td>
                <td>{formatearCLP(p.precio)}</td>
                <td style={stockBajo ? { color: 'var(--peligro)', fontWeight: 700 } : {}}>
                  {p.stock} {stockBajo && '⚠'}
                </td>
                <td>
                  <Link to={`/admin/productos/${p.codigo}/editar`} className="btn btn-sm">Editar</Link>{' '}
                  <button
                    className="btn btn-peligro btn-sm"
                    onClick={() => { if (confirm(`¿Eliminar ${p.nombre}?`)) eliminarProducto(p.codigo) }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </AdminLayout>
  );
}

export default AdminProductos;
