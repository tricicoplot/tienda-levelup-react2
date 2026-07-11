import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTienda } from '../context/TiendaContext.jsx'

function Login() {
  const { login } = useTienda()
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (login(form.email, form.password)) {
      navigate('/')
    } else {
      alert('Email o contraseña incorrectos. Verifica tus datos en usuarios.json')
    }
  }

  return (
    <div className="contenedor">
      <h1>Iniciar Sesión</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>Email:
          <input type="email" placeholder="Email" required onChange={e => setForm({...form, email: e.target.value})} />
        </label>
        <label>Contraseña:
          <input type="password" placeholder="Contraseña" required onChange={e => setForm({...form, password: e.target.value})} />
        </label>
        <button type="submit" className="btn btn-primario">Entrar</button>
      </form>
    </div>
  )
}
export default Login