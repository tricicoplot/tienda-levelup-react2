import { useState } from 'react';
import { useTienda } from '../context/TiendaContext.jsx';
import { useNavigate } from 'react-router-dom';
import { formatearCLP } from '../utils/formato.js';

function Checkout() {
  const { carrito, descuento, sesion, crearOrden, vaciarCarrito } = useTienda();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: sesion?.nombre || '',
    email: sesion?.email || '',
    direccion: '',
    region: '',
    comuna: '',
    tarjeta: '',
  });

  const subtotal = carrito.reduce((sum, item) => sum + (Number(item.precio) * (item.cantidad || 1)), 0);
  const total = subtotal * (1 - descuento);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function procesarPago(e) {
    e.preventDefault();

    // Simulación: una tarjeta que termine en "0000" es rechazada por el banco
    const pagoExitoso = !form.tarjeta.trim().endsWith('0000');

    if (!pagoExitoso) {
      navigate('/pago-error');
      return;
    }

    const orden = crearOrden({
      cliente: { nombre: form.nombre, email: form.email, direccion: form.direccion, ciudad: form.comuna },
      pago: { tarjeta: `**** **** **** ${form.tarjeta.slice(-4)}` },
      items: carrito.map(i => ({ codigo: i.codigo, nombre: i.nombre, precio: i.precio, cantidad: i.cantidad || 1 })),
      total,
      estado: 'pagada',
    });

    vaciarCarrito();
    navigate(`/boleta/${orden.id}`);
  }

  if (carrito.length === 0) {
    return (
      <div className="contenedor">
        <h1>Finalizar Compra</h1>
        <p>Tu carrito está vacío.</p>
      </div>
    );
  }

  return (
    <div className="contenedor">
      <h1>Finalizar Compra</h1>
      <form className="form" onSubmit={procesarPago}>
        <label>Nombre Completo:
          <input name="nombre" value={form.nombre} onChange={handleChange} required />
        </label>
        <label>Correo electrónico:
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>Dirección:
          <input name="direccion" value={form.direccion} onChange={handleChange} required />
        </label>

        <label>Región:
          <select name="region" value={form.region} onChange={handleChange} required>
            <option value="">Seleccione Región...</option>
            <option value="RM">Metropolitana</option>
            <option value="Valparaiso">Valparaíso</option>
            <option value="Biobio">Biobío</option>
          </select>
        </label>

        <label>Comuna:
          <select name="comuna" value={form.comuna} onChange={handleChange} required>
            <option value="">Seleccione Comuna...</option>
            <option value="La Pintana">La Pintana</option>
            <option value="Santiago">Santiago</option>
            <option value="Providencia">Providencia</option>
            <option value="Puente Alto">Puente Alto</option>
          </select>
        </label>

        <label>Número de tarjeta:
          <input name="tarjeta" value={form.tarjeta} onChange={handleChange} required placeholder="4111 1111 1111 1234" />
        </label>
        <div className="form-error" style={{ color: 'var(--muted)' }}>
          Tip demo: termina la tarjeta en 0000 para simular un pago rechazado.
        </div>

        <h2 style={{ color: 'var(--acento)' }}>Total: {formatearCLP(total)}</h2>
        <button type="submit" className="btn btn-primario">PAGAR AHORA</button>
      </form>
    </div>
  );
}
export default Checkout;
