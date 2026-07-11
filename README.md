# Level-Up Gamer

Proyecto final de desarrollo web para la plataforma de e-commerce especializada en artículos y componentes para gamers.

## Competencias Técnicas
- **SPA Development:** Navegación dinámica sin recarga mediante React Router DOM.
- **State Management:** Implementación de `Context API` para la centralización de datos globales (productos, usuarios, órdenes).
- **Seguridad:** Gestión de rutas protegidas mediante componentes de orden superior (HOC) basados en roles de usuario.
- **Diseño Responsive:** Interfaz optimizada con CSS moderno, variables globales y diseño temático "Gamer".

## Estructura del Proyecto
La arquitectura sigue buenas prácticas de modularización para facilitar el mantenimiento y escalabilidad:

```text
level-up-gamer/
├── public/              # Recursos estáticos
│   ├── logo.svg         # Favicon institucional
│   └── index.html       # Punto de entrada de la SPA
├── src/
│   ├── components/      # Componentes reutilizables (Header, Footer, UI)
│   ├── context/         # Lógica de estado global (TiendaContext)
│   ├── pages/           # Vistas de la aplicación
│   │   ├── admin/       # Páginas protegidas (Dashboard, Productos, Ordenes)
│   │   └── ...          # Vistas públicas (Home, Productos, Checkout)
│   ├── App.jsx          # Configuración de rutas y layout principal
│   ├── index.css        # Estilos globales (Variables neón)
│   └── main.jsx         # Punto de montaje del DOM
├── package.json         # Dependencias y scripts de construcción
└── README.md            # Documentación del proyecto

Construcción y Despliegue
Este proyecto utiliza Vite como empaquetador para optimizar el rendimiento.

## Acceso al Sistema (Pruebas)

Para facilitar la evaluación, puedes utilizar las siguientes credenciales para probar los diferentes perfiles de usuario:

| Perfil | Usuario | Contraseña |
| :--- | :--- | :--- |
| **Administrador** | `admin@levelup.cl` | `123` |
| **Vendedor** | `vendedor@levelup.cl` | `123` |
| **Usuario Cliente** | `usuario@test.cl` | `123` |

*Nota: El acceso a las rutas protegidas (`/admin/*`) está restringido según el rol del usuario autenticado.*

Instalación: npm install

Desarrollo: npm run dev

Build para Producción: npm run build
Genera los archivos estáticos optimizados en la carpeta dist/.

Previsualización: npm run preview

Desarrollado para la evaluación de Front End - 2026