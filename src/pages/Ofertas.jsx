import { useTienda } from '../context/TiendaContext.jsx'
import ProductoCard from '../components/ProductoCard.jsx'

function Ofertas() {
  const { productos } = useTienda()
  const ofertas = (productos || []).filter(p => p.oferta)

  return (
    <>
      <h1>🔥 Ofertas</h1>
      {ofertas.length === 0 ? (
        <p>No hay ofertas activas por el momento.</p>
      ) : (
        <div className="grid">
          {ofertas.map(p => <ProductoCard key={p.codigo} producto={p} />)}
        </div>
      )}
    </>
  )
}
export default Ofertas
