// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import { TiendaProvider } from './context/TiendaContext.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import RutaProtegida from './components/RutaProtegida.jsx'
import Home from './pages/Home.jsx'
import Productos from './pages/Productos.jsx'
import Ofertas from './pages/Ofertas.jsx'
import ProductoDetalle from './pages/ProductoDetalle.jsx'
import Carrito from './pages/Carrito.jsx'
import Checkout from './pages/Checkout.jsx'
import Boleta from './pages/Boleta.jsx'
import PagoError from './pages/PagoError.jsx'
import Login from './pages/Login.jsx'
import Registro from './pages/Registro.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Contacto from './pages/Contacto.jsx'
import Blog from './pages/Blog.jsx'
import BlogDetalle from './components/BlogDetalle.jsx'
import MapaEventos from './pages/MapaEventos.jsx'
import Perfil from './pages/Perfil.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import AdminProductos from './pages/admin/Productos.jsx'
import ProductoForm from './pages/admin/ProductoForm.jsx'
import AdminUsuarios from './pages/admin/Usuarios.jsx'
import UsuarioForm from './pages/admin/UsuarioForm.jsx'
import AdminOrdenes from './pages/admin/Ordenes.jsx'
import AdminReportes from './pages/admin/Reportes.jsx'

function App() {
  return (
    <TiendaProvider>
      <div className="app">
        <Header />
        <main className="contenedor">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/productos/:codigo" element={<ProductoDetalle />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/boleta/:id" element={<Boleta />} />
            <Route path="/pago-error" element={<PagoError />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetalle />} />
            <Route path="/eventos" element={<MapaEventos />} />
            <Route path="/perfil" element={<RutaProtegida><Perfil /></RutaProtegida>} />
            
            {/* Rutas de Administración */}
            <Route path="/admin" element={<RutaProtegida rol="admin"><Dashboard /></RutaProtegida>} />
            <Route path="/admin/productos" element={<RutaProtegida rol="admin"><AdminProductos /></RutaProtegida>} />
            <Route path="/admin/productos/nuevo" element={<RutaProtegida rol="admin"><ProductoForm /></RutaProtegida>} />
            <Route path="/admin/usuarios" element={<RutaProtegida rol="admin"><AdminUsuarios /></RutaProtegida>} />
            <Route path="/admin/ordenes" element={<RutaProtegida rol="admin"><AdminOrdenes /></RutaProtegida>} />
            
            <Route path="*" element={<div><h1>404</h1><p>Página no encontrada.</p></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </TiendaProvider>
  )
}
export default App