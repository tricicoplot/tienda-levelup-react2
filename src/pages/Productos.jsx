import { useMemo, useState } from 'react'
import { useTienda } from '../context/TiendaContext.jsx'
import ProductoCard from '../components/ProductoCard.jsx'

function Productos() {
  const { productos } = useTienda()
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('')

  // LÍNEA 10 CORREGIDA: Agregado el ?. y el || [] para que no falle si productos es undefined
  const categorias = useMemo(() => [...new Set(productos?.map(p => p.categoria) || [])], [productos])
  
  // FILTRO CORREGIDO: Nos aseguramos de que productos sea un arreglo antes de filtrar
  const lista = (productos || []).filter(p =>
    (!categoria || p.categoria === categoria) &&
    (!busqueda || p.nombre.toLowerCase().includes(busqueda.toLowerCase()))
  )

  return (
    <>
      <h1>Catálogo</h1>
      <div className="filtros">
        <input placeholder="Buscar producto..." value={busqueda} onChange={e => setBusqueda(e.target.value)} className="btn" style={{ minWidth: 220 }} />
        <select value={categoria} onChange={e => setCategoria(e.target.value)} className="btn">
          <option value="">Todas las categorías</option>
          {categorias.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <span className="badge">{lista.length} productos</span>
      </div>
      {lista.length === 0 ? <p>No hay productos que coincidan.</p> : (
        <div className="grid">
          {lista.map(p => <ProductoCard key={p.codigo} producto={p} />)}
        </div>
      )}
    </>
  )
}
export default Productos