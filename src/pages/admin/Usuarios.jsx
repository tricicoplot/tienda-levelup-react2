import { Link } from 'react-router-dom'
import { AdminLayout } from './_Layout.jsx'
import { useTienda } from '../../context/TiendaContext.jsx'

function AdminUsuarios() {
  const { usuarios, eliminarUsuario, sesion } = useTienda()

  function handleEliminar(id) {
    if (id === sesion?.id) {
      alert('No puedes eliminar tu propio usuario mientras tienes sesión activa.')
      return
    }
    if (confirm('¿Eliminar este usuario?')) eliminarUsuario(id)
  }

  return (
    <AdminLayout>
      <h1>Administrar Usuarios</h1>
      <Link to="/admin/usuarios/nuevo" className="btn btn-primario" style={{ marginBottom: 16, display: 'inline-block' }}>
        Nuevo Usuario
      </Link>

      <table className="tabla">
        <thead>
          <tr><th>Nombre</th><th>Email</th><th>Rol</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {(usuarios || []).map((u) => (
            <tr key={u.id}>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>
                <span className="badge" style={u.rol === 'admin' ? { color: 'var(--acento)' } : {}}>{u.rol}</span>
              </td>
              <td>
                <Link to={`/admin/usuarios/${u.id}/editar`} className="btn btn-sm">Editar</Link>{' '}
                <button className="btn btn-peligro btn-sm" onClick={() => handleEliminar(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  )
}
export default AdminUsuarios
