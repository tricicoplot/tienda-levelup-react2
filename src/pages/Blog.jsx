import { Link } from 'react-router-dom'

function Blog() {
  return (
    <div style={{ padding: '40px', color: 'white' }}>
      <h1>Noticias y Novedades</h1>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <Link to="/blog/audio" className="btn">El secreto del audio</Link>
        <Link to="/blog/setup" className="btn">El dilema del setup</Link>
      </div>
    </div>
  )
}
export default Blog