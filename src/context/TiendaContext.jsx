import { createContext, useContext, useEffect, useState } from 'react'
import productosIniciales from '../data/productos.json'
import usuariosData from '../data/usuarios.json'

const TiendaContext = createContext(null)
export const useTienda = () => useContext(TiendaContext)

function nextId(lista) {
  return lista.length === 0 ? 1 : Math.max(...lista.map(i => i.id || 0)) + 1
}

export function TiendaProvider({ children }) {
  const [carrito, setCarrito] = useState(() => JSON.parse(localStorage.getItem('carrito')) || [])
  const [sesion, setSesion] = useState(() => JSON.parse(localStorage.getItem('sesion')) || null)
  const [productos, setProductos] = useState(() => JSON.parse(localStorage.getItem('productos')) || productosIniciales)
  const [usuarios, setUsuarios] = useState(() => {
    const guardados = JSON.parse(localStorage.getItem('usuarios')) || usuariosData;
    return guardados.map(u => ({ ...u, puntos: u.puntos || 0 }));
  })
  const [ordenes, setOrdenes] = useState(() => JSON.parse(localStorage.getItem('ordenes')) || [])
  const [resenas, setResenas] = useState(() => JSON.parse(localStorage.getItem('resenas')) || [])
  const [descuento, setDescuento] = useState(() => Number(localStorage.getItem('descuento')) || 0)
  const [cuponAplicado, setCuponAplicado] = useState(() => localStorage.getItem('cuponAplicado') || '')

  useEffect(() => { localStorage.setItem('carrito', JSON.stringify(carrito)) }, [carrito])
  useEffect(() => { localStorage.setItem('sesion', JSON.stringify(sesion)) }, [sesion])
  useEffect(() => { localStorage.setItem('productos', JSON.stringify(productos)) }, [productos])
  useEffect(() => { localStorage.setItem('usuarios', JSON.stringify(usuarios)) }, [usuarios])
  useEffect(() => { localStorage.setItem('ordenes', JSON.stringify(ordenes)) }, [ordenes])
  useEffect(() => { localStorage.setItem('resenas', JSON.stringify(resenas)) }, [resenas])
  useEffect(() => { localStorage.setItem('descuento', String(descuento)) }, [descuento])
  useEffect(() => { localStorage.setItem('cuponAplicado', cuponAplicado) }, [cuponAplicado])

  const login = (email, password) => {
    const usuarioEncontrado = usuarios.find(u => u.email === email && u.password === password)
    if (usuarioEncontrado) {
      setSesion(usuarioEncontrado)
      return true
    }
    return false
  }

  const logout = () => {
    setSesion(null)
    localStorage.removeItem('sesion')
  }

  const agregarUsuario = (nuevo) => {
    if (usuarios.some(u => u.email.toLowerCase() === nuevo.email.toLowerCase())) {
      throw new Error('Ya existe una cuenta con ese correo electrónico.')
    }
    const usuarioCreado = { ...nuevo, id: nextId(usuarios), rol: nuevo.rol || 'cliente', puntos: 0 }
    setUsuarios(prev => [...prev, usuarioCreado])
    return usuarioCreado
  }

  const actualizarUsuario = (id, cambios) => {
    setUsuarios(prev => prev.map(u => u.id === id ? { ...u, ...cambios, id } : u))
  }

  const eliminarUsuario = (id) => setUsuarios(prev => prev.filter(u => u.id !== id))

  const crearProducto = (nuevo) => {
    if (productos.some(p => p.codigo === nuevo.codigo)) {
      throw new Error('Ya existe un producto con ese código.')
    }
    setProductos(prev => [...prev, nuevo])
    return nuevo
  }

  const editarProducto = (codigo, nuevosDatos) => {
    setProductos(prev => prev.map(p => p.codigo === codigo ? { ...p, ...nuevosDatos } : p))
  }

  const eliminarProducto = (codigo) => setProductos(prev => prev.filter(p => p.codigo !== codigo))

  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito(prev => {
      const existente = prev.find(i => i.codigo === producto.codigo)
      const precioUnitario = producto.oferta ? producto.precioOferta : producto.precio
      if (existente) {
        return prev.map(i => i.codigo === producto.codigo ? { ...i, cantidad: i.cantidad + cantidad } : i)
      }
      return [...prev, { ...producto, precio: precioUnitario, cantidad }]
    })
  }

  const cambiarCantidadCarrito = (codigo, cantidad) => {
    if (cantidad < 1) return
    setCarrito(prev => prev.map(i => i.codigo === codigo ? { ...i, cantidad } : i))
  }

  const quitarDelCarrito = (codigo) => setCarrito(prev => prev.filter(i => i.codigo !== codigo))

  const vaciarCarrito = () => {
    setCarrito([])
    setDescuento(0)
    setCuponAplicado('')
  }

  const aplicarCupon = (codigo) => {
    const normalizado = (codigo || '').trim().toUpperCase()
    if (normalizado === 'DUOC' || normalizado === 'DUOC20') {
      setDescuento(0.2)
      setCuponAplicado(normalizado)
      return { valido: true }
    }
    setDescuento(0)
    setCuponAplicado('')
    return { valido: false }
  }

  const crearOrden = (datosOrden) => {
    const id = nextId(ordenes)
    const puntosGanados = Math.floor(datosOrden.total / 1000) * 10
    const nuevaOrden = { id, fecha: new Date().toISOString(), estado: 'pagada', ...datosOrden }
    setOrdenes(prev => [...prev, nuevaOrden])

    if (sesion) {
      setUsuarios(prev => prev.map(u => u.id === sesion.id ? { ...u, puntos: (u.puntos || 0) + puntosGanados } : u))
      setSesion(prev => ({ ...prev, puntos: (prev.puntos || 0) + puntosGanados }))
    }

    setProductos(prev => prev.map(p => {
      const item = nuevaOrden.items.find(i => i.codigo === p.codigo)
      return item ? { ...p, stock: Math.max(0, p.stock - item.cantidad) } : p
    }))
    return nuevaOrden
  }

  const actualizarEstadoOrden = (id, estado) => {
    setOrdenes(prev => prev.map(o => o.id === id ? { ...o, estado } : o))
  }

  const agregarResena = (nueva) => {
    setResenas(prev => [...prev, { ...nueva, id: nextId(prev) }])
  }

  const valor = {
    carrito, agregarAlCarrito, cambiarCantidadCarrito, quitarDelCarrito, vaciarCarrito,
    descuento, cuponAplicado, aplicarCupon,
    sesion, setSesion, login, logout,
    productos, setProductos, crearProducto, editarProducto, eliminarProducto,
    usuarios, setUsuarios, agregarUsuario, registrarUsuario: agregarUsuario,
    actualizarUsuario, eliminarUsuario,
    ordenes, setOrdenes, crearOrden, actualizarEstadoOrden,
    resenas, agregarResena,
  }

  return <TiendaContext.Provider value={valor}>{children}</TiendaContext.Provider>
}