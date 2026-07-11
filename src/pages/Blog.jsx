import { Link } from 'react-router-dom';

function Blog() {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Noticias y Novedades</h1>
      <div className="row g-4">
        <div className="col-12 col-md-6 col-lg-3">
          <Link to="/blog/audio" className="btn btn-azul-neon w-100">El secreto del audio</Link>
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <Link to="/blog/setup" className="btn btn-verde-neon w-100">El dilema del setup</Link>
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <Link to="/blog/nube" className="btn btn-azul-neon w-100">El futuro en la nube</Link>
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <Link to="/blog/esports" className="btn btn-verde-neon w-100">Esports: Más que un juego</Link>
        </div>
      </div>
    </div>
  );
}

export default Blog;