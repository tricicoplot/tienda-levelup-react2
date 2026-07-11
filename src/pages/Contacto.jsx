import { useState } from 'react'
function Contacto() {
  const [enviado, setEnviado] = useState(false)
  function enviar(e) { e.preventDefault(); setEnviado(true) }
  return (
    <>
      <h1>Contacto</h1>
      {enviado && <div className="mensaje ok">Mensaje enviado. Te responderemos pronto.</div>}
      <form className="form" onSubmit={enviar}>
        <label>Nombre <input required /></label>
        <label>Email <input type="email" required /></label>
        <label>Mensaje <textarea rows="4" required /></label>
        <button className="btn btn-primario">Enviar</button>
      </form>
    </>
  )
}
export default Contacto
