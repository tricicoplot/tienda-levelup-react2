import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTienda } from '../context/TiendaContext.jsx'

function Registro() {
  const { registrarUsuario, login } = useTienda()
  const navigate = useNavigate()
  const [datos, setDatos] = useState({ nombre: '', email: '', password: '', fechaNacimiento: '' })
  const [error, setError] = useState('')

  function enviar(e) {
    e.preventDefault()
    setError('')
    
    if (!datos.fechaNacimiento) return setError('Selecciona tu fecha de nacimiento.')

    const [year, month, day] = datos.fechaNacimiento.split('-').map(Number)
    const fechaNac = new Date(year, month - 1, day)
    const hace18Anios = new Date()
    hace18Anios.setFullYear(hace18Anios.getFullYear() - 18)
    
    if (fechaNac > hace18Anios) return setError('Debes ser mayor de 18 años.')

    const dominios = ['@inacap.cl', '@inacapmail.cl', '@gmail.com', '@levelup.cl']
    if (!dominios.some(d => datos.email.endsWith(d))) return setError('Dominio no permitido.')
    if (datos.password.length < 4 || datos.password.length > 10) return setError('Contraseña: 4-10 caracteres.')
    
    try {
      registrarUsuario(datos)
      login(datos.email, datos.password)
      navigate('/')
    } catch (err) { setError(err.message || 'Error al registrar') }
  }

  return (
    <div className="contenedor">
      <h1>Crear cuenta</h1>
      <form className="form" onSubmit={enviar}>
        <label>Nombre <input value={datos.nombre} onChange={e => setDatos({...datos, nombre: e.target.value})} required /></label>
        <label>Email <input type="email" value={datos.email} onChange={e => setDatos({...datos, email: e.target.value})} required /></label>
        <label>Contraseña <input type="password" value={datos.password} onChange={e => setDatos({...datos, password: e.target.value})} required /></label>
        <label>Fecha de Nacimiento <input type="date" value={datos.fechaNacimiento} onChange={e => setDatos({...datos, fechaNacimiento: e.target.value})} required /></label>
        {error && <div className="form-error" style={{ color: 'red' }}>{error}</div>}
        <button className="btn btn-primario" type="submit">Registrarme</button>
      </form>
    </div>
  )
}
export default Registro