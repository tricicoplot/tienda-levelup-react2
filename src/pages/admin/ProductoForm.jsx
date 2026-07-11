import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminLayout } from './_Layout.jsx';
import { useTienda } from '../../context/TiendaContext.jsx';

const CATEGORIAS = ['Juegos de Mesa', 'Accesorios', 'Consolas', 'Computadores Gamers', 'Sillas Gamers', 'Mouse', 'Mousepad', 'Poleras Personalizadas'];

const VACIO = {
  codigo: '', nombre: '', descripcion: '', categoria: '', precio: '', stock: '', stockCritico: '',
  fabricante: '', garantia: '', imagen: '', imagenesTexto: '', oferta: false, precioOferta: '',
};

function ProductoForm() {
  const { codigo } = useParams();
  const editar = Boolean(codigo);
  const { productos, crearProducto, editarProducto } = useTienda();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(VACIO);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editar) {
      const prod = productos.find(p => p.codigo === codigo);
      if (prod) setFormData({ ...prod, imagenesTexto: (prod.imagenes || []).join(', ') });
    }
  }, [codigo]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const imagenesArray = formData.imagenesTexto
      ? formData.imagenesTexto.split(',').map(s => s.trim()).filter(Boolean)
      : [];
    const imagenPrincipal = formData.imagen || imagenesArray[0] || '/logo.svg';

    const datos = {
      ...formData,
      precio: Number(formData.precio),
      stock: Number(formData.stock),
      stockCritico: Number(formData.stockCritico || 0),
      precioOferta: formData.oferta ? Number(formData.precioOferta) : null,
      imagen: imagenPrincipal,
      imagenes: imagenesArray.length ? imagenesArray : [imagenPrincipal],
    };
    delete datos.imagenesTexto;

    try {
      if (editar) {
        editarProducto(codigo, datos);
      } else {
        crearProducto(datos);
      }
      navigate('/admin/productos');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AdminLayout>
      <h1>{editar ? `Editar Producto: ${formData.nombre}` : 'Nuevo Producto'}</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>Código *
          <input value={formData.codigo} onChange={(e) => setFormData({ ...formData, codigo: e.target.value })} required disabled={editar} placeholder="JM001" />
        </label>

        <label>Nombre *
          <input value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} required />
        </label>

        <label>Descripción
          <textarea value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} />
        </label>

        <label>Categoría *
          <select name="categoria" value={formData.categoria} onChange={handleChange} required>
            <option value="">-- Seleccionar --</option>
            {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>

        <label>Fabricante
          <input name="fabricante" value={formData.fabricante} onChange={handleChange} placeholder="Ej: Logitech" />
        </label>

        <label>Garantía
          <input name="garantia" value={formData.garantia} onChange={handleChange} placeholder="Ej: 12 meses" />
        </label>

        <label>Precio ($) *
          <input type="number" value={formData.precio} onChange={(e) => setFormData({ ...formData, precio: Number(e.target.value) })} required min="0" />
        </label>

        <label>Stock *
          <input type="number" name="stock" value={formData.stock} onChange={handleChange} required min="0" />
        </label>

        <label>Stock crítico
          <input type="number" name="stockCritico" value={formData.stockCritico} onChange={handleChange} min="0" />
        </label>

        <label>Imágenes (varias URLs separadas por coma)
          <textarea
            name="imagenesTexto"
            value={formData.imagenesTexto}
            onChange={handleChange}
            placeholder="/productos/JM001.jpg, /productos/JM001-2.jpg, /productos/JM001-3.jpg"
          />
        </label>

        <label style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" name="oferta" checked={formData.oferta} onChange={handleChange} style={{ width: 'auto' }} />
          Producto en oferta
        </label>

        {formData.oferta && (
          <label>Precio de oferta
            <input type="number" name="precioOferta" value={formData.precioOferta || ''} onChange={handleChange} min="0" />
          </label>
        )}

        {error && <div className="form-error">{error}</div>}

        <div style={{ display: 'flex', gap: 10 }}>
          <button type="submit" className="btn btn-primario">{editar ? 'Guardar Cambios' : 'Crear Producto'}</button>
          <button type="button" className="btn" onClick={() => navigate('/admin/productos')}>Volver</button>
        </div>
      </form>
    </AdminLayout>
  );
}

export default ProductoForm;
