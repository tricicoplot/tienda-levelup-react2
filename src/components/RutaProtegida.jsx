import { Navigate } from 'react-router-dom'
import { useTienda } from '../context/TiendaContext.jsx'

function RutaProtegida({ children, rol }) {
  const { sesion } = useTienda()
  if (!sesion) return <Navigate to="/login" replace />
  if (rol && sesion.rol !== rol) return <Navigate to="/" replace />
  return children
}
export default RutaProtegida
