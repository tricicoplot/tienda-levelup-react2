function MapaEventos() {
  return (
    <div style={{ padding: '40px', color: 'white', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Mapa de Eventos Gaming</h1>
      <p>Ubica nuestros próximos encuentros presenciales:</p>
      
      <div style={{ marginTop: '20px', borderRadius: '10px', overflow: 'hidden', border: '2px solid #39FF14' }}>
        <iframe 
          title="Mapa de Eventos"
          width="100%" 
          height="500" 
          frameBorder="0" 
          style={{ border: 0 }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.4233!2d-70.6693!3d-33.4489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCentro+de+Convenciones+Santiago!5e0!3m2!1ses-419!2scl!4v1620000000000!5m2!1ses-419!2scl" 
          allowFullScreen>
        </iframe>
      </div>

      <div style={{ marginTop: '20px', background: '#1a1a1a', padding: '20px', borderRadius: '10px' }}>
        <h3>Próximos Encuentros</h3>
        <ul>
          <li>📅 15 Agosto: Torneo Nacional eSports - Centro de Convenciones</li>
          <li>📅 20 Septiembre: Expo Gamer Chile - Movistar Arena</li>
        </ul>
      </div>
    </div>
  )
}
export default MapaEventos