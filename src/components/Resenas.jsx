import { useState } from 'react'
import { useTienda } from '../context/TiendaContext.jsx'

function Resenas({ productoId }) {
  const { resenas, agregarResena, sesion } = useTienda()
  const [comentario, setComentario] = useState('')
  const [estrellas, setEstrellas] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (estrellas === 0) return alert('Selecciona estrellas')
    agregarResena({ productoId, usuario: sesion?.nombre || 'Anónimo', comentario, estrellas, fecha: new Date().toLocaleDateString() })
    setComentario(''); setEstrellas(0)
  }

  const listado = (resenas || []).filter(r => r.productoId === productoId)

  return (
    <div style={{ color: 'white' }}>
      <h3>Opiniones</h3>
      <form onSubmit={handleSubmit}>
        <div>
          {[1,2,3,4,5].map(n => (
            <span key={n} onClick={() => setEstrellas(n)} style={{ color: n <= estrellas ? '#FFD700' : 'gray', cursor: 'pointer', fontSize: '24px' }}>★</span>
          ))}
        </div>
        <textarea value={comentario} onChange={(e) => setComentario(e.target.value)} placeholder="Comentario..." />
        <button type="submit">Publicar</button>
      </form>
      {listado.map(r => (
        <p key={r.id}><strong>{r.estrellas}★</strong> {r.comentario} ({r.usuario})</p>
      ))}
    </div>
  )
}
export default Resenas;