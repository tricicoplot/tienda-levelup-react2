# Tienda Level-Up Gamer (React + JSX)

Proyecto de evaluación — Unidad 3.
Vite + React 19 + React Router DOM + localStorage.

## Requisitos
- Node.js 20+
- Visual Studio Code

## Cómo ejecutar
```bash
npm install
npm run dev
```
Abre http://localhost:5173

## Comandos
- `npm run dev` – servidor de desarrollo
- `npm run build` – compilar producción
- `npm run preview` – previsualizar build

## Estructura
```
src/
  main.jsx              → punto de entrada
  App.jsx               → rutas de la aplicación
  index.css             → estilos gamer (dark + neón)
  context/
    TiendaContext.jsx   → estado global + localStorage
  components/
    Header.jsx / Footer.jsx / ProductoCard.jsx / RutaProtegida.jsx
  pages/
    Home.jsx, Productos.jsx, ProductoDetalle.jsx,
    Carrito.jsx, Checkout.jsx, Boleta.jsx, PagoError.jsx,
    Login.jsx, Registro.jsx, Nosotros.jsx, Contacto.jsx,
    admin/ (Dashboard, Productos, ProductoForm, Usuarios,
            UsuarioForm, Ordenes, Reportes)
  data/productos.json   → catálogo inicial
  utils/formato.js      → formato CLP
```

## Usuarios de prueba
- Admin: `admin@levelup.cl` / `admin123`
- Cliente: `cliente@levelup.cl` / `cliente123`

## Pago de prueba
- Cualquier tarjeta funciona.
- Para simular error: número de tarjeta terminado en `0000`.
