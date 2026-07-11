import { useTienda } from '../../context/TiendaContext.jsx'
import { useNavigate, Link } from 'react-router-dom'

export function AdminLayout({ children }) {
  const { sesion } = useTienda()
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar con lógica de roles */}
      <nav style={{ width: '250px', background: '#222', color: '#fff', height: '100vh', padding: '20px' }}>
        <h3 style={{ color: '#39FF14' }}>Nivel Admin</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {/* VENDEDOR Y ADMIN pueden ver estos enlaces */}
          {(sesion?.rol === 'admin' || sesion?.rol === 'vendedor') && (
            <>
              <li style={{ margin: '15px 0' }}><Link to="/admin/productos" style={{color:'white'}}>Productos</Link></li>
              <li style={{ margin: '15px 0' }}><Link to="/admin/ordenes" style={{color:'white'}}>Órdenes</Link></li>
            </>
          )}
          {/* SOLO ADMIN ve el enlace de usuarios */}
          {sesion?.rol === 'admin' && (
            <li style={{ margin: '15px 0' }}><Link to="/admin/usuarios" style={{color:'white'}}>Usuarios</Link></li>
          )}
          <li style={{marginTop: '20px'}}>
            <button onClick={() => navigate('/')}>Volver a la Tienda</button>
          </li>
        </ul>
      </nav>
      
      {/* Contenido principal */}
      <main style={{ flex: 1, padding: '40px' }}>{children}</main>
    </div>
  )
}