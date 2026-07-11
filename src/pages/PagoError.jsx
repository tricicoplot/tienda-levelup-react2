import { Link } from 'react-router-dom'
function PagoError() {
  return (
    <>
      <div className="mensaje error">❌ El pago fue rechazado por el banco.</div>
      <h1>Error de pago</h1>
      <p>No pudimos procesar tu tarjeta. Verifica los datos e intenta nuevamente.</p>
      <Link to="/checkout" className="btn btn-primario">Reintentar pago</Link>{' '}
      <Link to="/carrito" className="btn">Volver al carrito</Link>
    </>
  )
}
export default PagoError
