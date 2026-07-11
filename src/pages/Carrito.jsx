import { useState } from 'react';
import { useTienda } from '../context/TiendaContext.jsx';
import { Link } from 'react-router-dom';
import { formatearCLP } from '../utils/formato.js';

function Carrito() {
  const { carrito, cambiarCantidadCarrito, quitarDelCarrito, descuento, cuponAplicado, aplicarCupon } = useTienda();
  const [codigoCupon, setCodigoCupon] = useState('');
  const [errorCupon, setErrorCupon] = useState('');

  const subtotal = carrito.reduce((sum, item) => sum + (Number(item.precio) * (item.cantidad || 1)), 0);
  const montoDescuento = subtotal * descuento;
  const total = subtotal - montoDescuento;

  function handleAplicarCupon() {
    const resultado = aplicarCupon(codigoCupon);
    setErrorCupon(resultado.valido ? '' : 'Cupón inválido. Prueba con DUOC o DUOC20.');
  }

  return (
    <div className="contenedor">
      <h1>Tu Carrito</h1>
      {carrito.length === 0 ? (
        <p>El carrito está vacío. <Link to="/productos" className="btn btn-sm">Ver productos</Link></p>
      ) : (
        <>
          <table className="tabla">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item) => (
                <tr key={item.codigo}>
                  <td>{item.nombre}</td>
                  <td>{formatearCLP(item.precio)}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.cantidad || 1}
                      onChange={(e) => cambiarCantidadCarrito(item.codigo, Number(e.target.value))}
                      style={{ width: 60, padding: 6, borderRadius: 6, border: '1px solid var(--borde)', background: 'var(--panel2)', color: 'var(--texto)' }}
                    />
                  </td>
                  <td>{formatearCLP(item.precio * (item.cantidad || 1))}</td>
                  <td>
                    <button
                      className="btn btn-peligro btn-sm"
                      onClick={() => quitarDelCarrito(item.codigo)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="form" style={{ marginTop: 20, maxWidth: 360 }}>
            <label>Cupón de descuento
              <input placeholder="DUOC20" value={codigoCupon} onChange={(e) => setCodigoCupon(e.target.value)} />
            </label>
            <button type="button" className="btn" onClick={handleAplicarCupon}>APLICAR</button>
            {errorCupon && <div className="form-error">{errorCupon}</div>}
            {cuponAplicado && <div className="form-ok">Cupón {cuponAplicado} aplicado: -20%</div>}
          </div>

          <div style={{ marginTop: 20, textAlign: 'right' }}>
            <p>Subtotal: {formatearCLP(subtotal)}</p>
            {montoDescuento > 0 && <p style={{ color: 'var(--acento)' }}>Descuento: -{formatearCLP(montoDescuento)}</p>}
            <h2>Total: <span style={{ color: 'var(--acento)' }}>{formatearCLP(total)}</span></h2>
            <Link to="/checkout" className="btn btn-primario">Finalizar Compra</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Carrito;
