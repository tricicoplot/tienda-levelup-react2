function Footer() {
  return (
    <footer style={{ 
      textAlign: 'center', 
      padding: '20px', 
      backgroundColor: '#212529', // bg-dark
      marginTop: 'auto', 
      color: '#6c757d', // text-secondary
      borderTop: '1px solid #444' 
    }}>
      <p style={{ marginBottom: '10px' }}>&copy; 2026 Level-Up Gamer. Todos los derechos reservados.</p>
      
      {/* Botón de Soporte Técnico centrado */}
      <a 
        href="https://wa.me/56912345678?text=Hola,%20necesito%20ayuda%20con%20la%20tienda%20Level-Up%20Gamer" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          display: 'block',          // Esto permite centrar con márgenes
          width: 'fit-content',      // Ajusta al ancho del contenido
          margin: '10px auto',       // Centrado horizontal
          textDecoration: 'none',
          color: '#25D366',
          fontWeight: 'bold',
          padding: '10px',
          border: '1px solid #25D366',
          borderRadius: '5px'
        }}
      >
        💬 Soporte Técnico
      </a>
    </footer>
  )
}
export default Footer