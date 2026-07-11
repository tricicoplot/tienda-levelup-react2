// src/components/Header.jsx
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useTienda } from '../context/TiendaContext.jsx'

function Header() {
  const { sesion, logout, carrito } = useTienda()
  const navigate = useNavigate()
  const totalItems = carrito.reduce((s, i) => s + (i.cantidad || 0), 0)

  function salir() {
    logout()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <img src="/logo.svg" alt="Logo" />
          <div>Level<span>-Up</span> Gamer</div>
        </Link>
        <nav className="nav">
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/productos">Productos</NavLink>
          <NavLink to="/ofertas">Ofertas</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/eventos">Eventos</NavLink>
          <NavLink to="/nosotros">Nosotros</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>
          {sesion?.rol === 'admin' && <NavLink to="/admin">Admin</NavLink>}
        </nav>
        <div className="header-acciones">
          <Link to="/carrito" className="btn btn-sm">🛒 {totalItems}</Link>
          {sesion ? (
            <>
              {/* Enlace al perfil añadido para usuarios logueados */}
              <Link to="/perfil" className="btn btn-sm">Perfil</Link>
              <span className="badge">{sesion.nombre}</span>
              <button className="btn btn-sm" onClick={salir}>Salir</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm">Ingresar</Link>
              <Link to="/registro" className="btn btn-sm btn-primario">Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header