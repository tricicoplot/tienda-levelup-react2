import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTienda } from '../context/TiendaContext.jsx'

function Registro() {
  const { registrarUsuario, login } = useTienda()
  const navigate = useNavigate()
  const [datos, setDatos] = useState({ nombre: '', email: '', password: '' })
  const [error, setError] = useState('')

  function enviar(e) {
    e.preventDefault()
    setError('')
    const dominios = ['@inacap.cl', '@inacapmail.cl', '@gmail.com', '@levelup.cl']
    if (!dominios.some(d => datos.email.endsWith(d))) {
      return setError('Dominio no permitido. Usa @inacap.cl, @inacapmail.cl, @gmail.com')
    }
    if (datos.password.length < 4 || datos.password.length > 10) {
      return setError('La contraseña debe tener entre 4 y 10 caracteres')
    }
    try {
      registrarUsuario(datos)
      login(datos.email, datos.password)
      navigate('/')
    } catch (err) { setError('Error al registrar') }
  }

  return (
    <div className="contenedor">
      <h1>Crear cuenta</h1>
      <form className="form" onSubmit={enviar}>
        <label>Nombre <input name="nombre" value={datos.nombre} onChange={e => setDatos({...datos, nombre: e.target.value})} required /></label>
        <label>Email <input name="email" type="email" value={datos.email} onChange={e => setDatos({...datos, email: e.target.value})} required /></label>
        <label>Contraseña <input name="password" type="password" value={datos.password} onChange={e => setDatos({...datos, password: e.target.value})} required /></label>
        {error && <div className="form-error">{error}</div>}
        <button className="btn btn-primario" type="submit">Registrarme</button>
      </form>
    </div>
  )
}
export default Registro