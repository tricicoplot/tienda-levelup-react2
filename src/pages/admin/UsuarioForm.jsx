import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AdminLayout } from './_Layout.jsx'
import { useTienda } from '../../context/TiendaContext.jsx'

function UsuarioForm() {
  const { id } = useParams()
  const editar = Boolean(id)
  const { usuarios, registrarUsuario, actualizarUsuario } = useTienda()
  const navigate = useNavigate()
  const [datos, setDatos] = useState({ nombre: '', email: '', password: '', rol: 'cliente' })
  const [error, setError] = useState('')

  useEffect(() => {
    if (editar) {
      const u = usuarios.find(x => x.id === Number(id))
      if (u) setDatos(u)
    }
  }, [id])

  function actualizar(e) { setDatos({ ...datos, [e.target.name]: e.target.value }) }

  function enviar(e) {
    e.preventDefault()
    setError('')
    try {
      if (editar) actualizarUsuario(Number(id), datos)
      else registrarUsuario(datos)
      navigate('/admin/usuarios')
    } catch (err) { setError(err.message) }
  }

  return (
    <AdminLayout>
      <h1>{editar ? 'Editar' : 'Nuevo'} usuario</h1>
      <form className="form" onSubmit={enviar}>
        <label>Nombre <input name="nombre" value={datos.nombre} onChange={actualizar} required /></label>
        <label>Email <input name="email" type="email" value={datos.email} onChange={actualizar} required /></label>
        <label>Contraseña <input name="password" type="text" value={datos.password} onChange={actualizar} required /></label>
        <label>Rol
          <select name="rol" value={datos.rol} onChange={actualizar}>
            <option value="cliente">Cliente</option>
            <option value="vendedor">Vendedor</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        {error && <div className="form-error">{error}</div>}
        <button className="btn btn-primario">Guardar</button>
      </form>
    </AdminLayout>
  )
}
export default UsuarioForm
