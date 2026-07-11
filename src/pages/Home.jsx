import { Link } from 'react-router-dom'
import { useTienda } from '../context/TiendaContext.jsx'
import ProductoCard from '../components/ProductoCard.jsx'

function Home() {
  const { productos } = useTienda()
  const destacados = productos?.slice(0, 4) || [];
  return (
    <>
      <section className="hero">
        <div>
          <h1>Sube de nivel con <span style={{ color: 'var(--acento)' }}>Level-Up Gamer</span></h1>
          <p>Los mejores periféricos, consolas y accesorios para gamers en Chile. Envíos a todo el país.</p>
          <Link to="/productos" className="btn btn-primario">Ver catálogo</Link>
        </div>
        <img src="/hero.png" alt="Setup gamer" />
      </section>
      <h2>Productos destacados</h2>
      <div className="grid">
        {destacados.map(p => <ProductoCard key={p.codigo} producto={p} />)}
      </div>
    </>
  )
}
export default Home
