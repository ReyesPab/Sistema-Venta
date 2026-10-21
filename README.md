# AutoParts Pro - Sistema de Ventas de Partes Vehiculares

## 📋 Descripción del Proyecto

Sistema web completo para la venta y alquiler de partes de vehículos con:
- Panel de administración
- Perfiles de vendedores con ubicación
- Catálogo de productos con búsqueda y filtros
- Sistema de pedidos con opciones de envío/recogida
- Chat con asistente AI
- Verificación de seguridad (email/SMS)
- Pagos con tarjeta Atlantic
- Diseño responsive (móvil y desktop)

---

## 🏗️ Estructura del Proyecto

```
├── src/
│   ├── App.tsx              # Componente principal con routing
│   ├── main.tsx             # Entry point
│   ├── index.css            # Estilos globales
│   ├── types/
│   │   └── index.ts         # Tipos TypeScript
│   ├── context/
│   │   └── AuthContext.tsx   # Contexto de autenticación
│   ├── data/
│   │   └── mockData.ts      # Datos de demostración
│   ├── components/
│   │   └── Layout.tsx       # Layout principal con sidebar
│   └── pages/
│       ├── LoginPage.tsx     # Login y registro
│       ├── DashboardPage.tsx # Dashboard por rol
│       ├── CatalogPage.tsx   # Catálogo de productos
│       ├── ProductDetailPage.tsx # Detalle de producto + checkout
│       ├── OrdersPage.tsx    # Gestión de pedidos
│       ├── ChatPage.tsx      # Chat con AI
│       ├── SettingsPage.tsx  # Configuración admin
│       ├── UsersPage.tsx     # Gestión de usuarios
│       └── SellerProfilePage.tsx # Perfil del vendedor
│
├── database/
│   ├── README.md            # Documentación de BD
│   ├── config.js            # Configuración de conexión
│   ├── schemas.js           # Esquemas MongoDB (Mongoose)
│   ├── .env.example         # Variables de entorno
│   └── prisma/
│       └── schema.prisma    # Esquema Prisma (PostgreSQL)
│
└── public/                  # Assets estáticos
```

---

## 👥 Roles del Sistema

### Administrador
- Control total del sistema
- Gestionar usuarios (verificar, desactivar)
- Configurar métodos de verificación
- Aprobar vendedores manualmente
- Configurar precios de suscripción
- Ver todos los pedidos y estadísticas
- Activar/desactivar modo mantenimiento

### Vendedor
- Dos formas de unirse:
  1. **Mensualidad**: Paga RD$1,500/mes automáticamente
  2. **Aprobación admin**: Contacta a administración
- Gestionar perfil de negocio (ubicación, horario, descripción)
- Publicar productos con fotos, precios y compatibilidad
- Ver y gestionar pedidos recibidos
- Chat con clientes (asistido por AI)

### Cliente
- Explorar catálogo completo
- Buscar por nombre, vehículo, categoría, ciudad
- Ver detalles de productos y ubicación del vendedor
- Agregar al carrito y comprar
- Elegir envío a domicilio o recoger en tienda
- Pagar con tarjeta Atlantic, transferencia o efectivo
- Chat con asistente AI para consultas
- Marcar favoritos

---

## 🔐 Seguridad

- **Verificación**: Email, SMS, o ambos (configurable por admin)
- **Contraseñas**: Hasheadas con bcrypt (12 rounds)
- **JWT**: Tokens con expiración de 7 días
- **Rate Limiting**: Protección contra ataques
- **SSL**: Pagos procesados con encriptación

---

## 💾 Base de Datos

### Recomendación: MongoDB + PostgreSQL (híbrido)

**MongoDB** para:
- Catálogo de productos (flexible)
- Perfiles de vendedor
- Búsquedas geoespaciales

**PostgreSQL** para:
- Pedidos y transacciones
- Pagos
- Integridad referencial

### Alternativa simple: Solo MongoDB
Con transacciones multi-documento para pedidos.

### Alternativa robusta: Solo PostgreSQL
Con Prisma ORM para máxima integridad.

---

## 🚀 Para Producción

1. **Backend**: Node.js + Express + Mongoose/Prisma
2. **Base de datos**: MongoDB Atlas o Supabase (PostgreSQL)
3. **Auth**: JWT + refresh tokens
4. **Pagos**: API de Atlantic o Stripe
5. **AI Chat**: OpenAI API
6. **Email**: SendGrid o Nodemailer
7. **SMS**: Twilio
8. **Storage**: AWS S3 o Cloudinary para imágenes
9. **Hosting**: Vercel (frontend) + Railway/Render (backend)

---

## 🎨 Tecnologías del Frontend

- **React 18** con TypeScript
- **Tailwind CSS** para estilos
- **Lucide React** para iconos
- **Context API** para estado global
- **Responsive design** (mobile-first)
- **Dark theme** moderno con glassmorphism

---

## 📱 Cuentas de Demo

| Rol | Email | Contraseña |
|-----|-------|------------|
| Admin | admin@autoparts.com | admin123 |
| Vendedor | vendedor@autoparts.com | vendedor123 |
| Cliente | cliente@email.com | cliente123 |
