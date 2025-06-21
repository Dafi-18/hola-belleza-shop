
# BeautyStore - Tienda Online de Cosméticos

Una moderna tienda online de productos cosméticos desarrollada con React, diseñada para ofrecer una experiencia de usuario intuitiva y atractiva.

## 🌟 Características

### Interfaz de Usuario
- **Diseño Moderno**: Interfaz elegante con gradientes y efectos visuales
- **Responsive**: Adaptable a todos los dispositivos (móvil, tablet, desktop)
- **Navegación Intuitiva**: Categorías claras y búsqueda en tiempo real
- **Animaciones Suaves**: Transiciones y efectos hover para mejor UX

### Funcionalidades
- **Catálogo de Productos**: Grid responsive con información detallada
- **Carrito de Compras**: Funcionalidad completa de agregar/eliminar productos
- **Sistema de Filtros**: Filtrado por categorías
- **Búsqueda**: Búsqueda en tiempo real por nombre y marca
- **Calificaciones**: Sistema de estrellas para productos
- **Ofertas Especiales**: Indicadores de productos nuevos y en oferta

### Categorías Disponibles
- **BASE**: Productos de maquillaje base
- **LABIOS**: Labiales y productos para labios
- **OJOS**: Sombras, máscaras y productos para ojos
- **ROSTRO**: Rubores y productos para el rostro
- **CUIDADO**: Productos de cuidado de la piel

## 🛠️ Tecnologías Utilizadas

- **React 18**: Framework de JavaScript para interfaces de usuario
- **TypeScript**: Tipado estático para mejor desarrollo
- **Tailwind CSS**: Framework de CSS para estilos rápidos y responsivos
- **Vite**: Herramienta de construcción rápida
- **Shadcn/UI**: Componentes de interfaz de usuario
- **Lucide React**: Iconografía moderna
- **React Router DOM**: Navegación entre páginas

## 📦 Estructura del Proyecto

```
src/
├── components/
│   └── ui/              # Componentes de UI de Shadcn
├── pages/
│   └── Index.tsx        # Página principal de la tienda
├── lib/
│   └── utils.ts         # Utilidades y funciones auxiliares
└── hooks/
    └── use-toast.ts     # Hook para notificaciones
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd beauty-store
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   Visita `http://localhost:5173` para ver la aplicación

## 📱 Uso de la Aplicación

### Para Usuarios
1. **Navegar**: Explora el catálogo usando las categorías o la búsqueda
2. **Agregar al Carrito**: Haz clic en "Agregar" en cualquier producto
3. **Gestionar Carrito**: Abre el carrito para ver, modificar cantidades o eliminar productos
4. **Finalizar Compra**: Procede al checkout desde el carrito

### Funcionalidades del Carrito
- Agregar productos con cantidad automática
- Incrementar/decrementar cantidades
- Eliminar productos individuales
- Cálculo automático del total
- Notificaciones de confirmación

## 🎨 Personalización

### Colores y Tema
El proyecto utiliza una paleta de colores rosa/rosa que puede personalizarse en:
- `tailwind.config.ts`: Configuración de colores globales
- Variables CSS personalizadas para el tema

### Productos
Los productos están definidos en el array `products` en `src/pages/Index.tsx`:
```typescript
const products: Product[] = [
  {
    id: 1,
    name: "Nombre del Producto",
    brand: "Marca",
    price: 42.99,
    originalPrice: 55.99, // Opcional para ofertas
    image: "URL_DE_LA_IMAGEN",
    category: "Categoría",
    rating: 4.8,
    reviews: 324,
    isNew: true, // Opcional
    isSale: true // Opcional
  },
  // ... más productos
];
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Vista previa de la construcción
npm run preview

# Linting
npm run lint
```

## 📊 Métricas de Rendimiento

- **Lighthouse Score**: Optimizado para rendimiento web
- **Core Web Vitals**: Cumple con los estándares de Google
- **Responsive**: Diseño móvil-first
- **Accesibilidad**: Implementación de mejores prácticas

## 🚀 Despliegue

### Usando Lovable
1. Haz clic en el botón "Publish" en la interfaz de Lovable
2. Tu aplicación estará disponible en `https://tu-proyecto.lovable.app`

### Otros Servicios
- **Vercel**: `npm run build` y sube la carpeta `dist`
- **Netlify**: Conecta tu repositorio de GitHub
- **GitHub Pages**: Configura GitHub Actions para deploy automático

## 🔮 Futuras Mejoras

### Funcionalidades Planeadas
- [ ] Sistema de autenticación de usuarios
- [ ] Integración con pasarela de pagos
- [ ] Lista de deseos
- [ ] Comparación de productos
- [ ] Reseñas y comentarios de usuarios
- [ ] Integración con redes sociales
- [ ] Sistema de cupones y descuentos

### Mejoras Técnicas
- [ ] Implementación de base de datos
- [ ] API REST para gestión de productos
- [ ] Sistema de notificaciones push
- [ ] Análisis y métricas de usuario
- [ ] Optimización SEO avanzada

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte y preguntas:
- **Documentación**: [https://docs.lovable.dev/](https://docs.lovable.dev/)
- **Comunidad**: [Discord de Lovable](https://discord.com/channels/1119885301872070706/1280461670979993613)
- **Tutoriales**: [YouTube Playlist](https://www.youtube.com/watch?v=9KHLTZaJcR8&list=PLbVHz4urQBZkJiAWdG8HWoJTdgEysigIO)

## 🙏 Agradecimientos

- **Lovable**: Por proporcionar la plataforma de desarrollo
- **Shadcn/UI**: Por los componentes de interfaz
- **Unsplash**: Por las imágenes de productos utilizadas
- **Lucide**: Por los iconos utilizados en la interfaz

---

**Desarrollado con ❤️ usando Lovable**

*Última actualización: Junio 2025*

