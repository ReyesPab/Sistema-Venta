# 🚗 AutoParts Pro - Sistema de Ventas de Partes Vehiculares

Sistema web completo y responsive para venta y alquiler de partes de vehículos con panel de administración, perfiles de vendedores geolocalizados, catálogo de productos, sistema de pedidos, chat con IA y pagos integrados.

---

## 🛠️ Trabajar en Visual Studio Code

### ✅ Requisitos Previos

1. **Node.js** (versión 18 o superior)
   - Descargar: https://nodejs.org/
   - Verificar: `node --version`

2. **Git** (opcional pero recomendado)
   - Descargar: https://git-scm.com/
   - Verificar: `git --version`

3. **Visual Studio Code**
   - Descargar: https://code.visualstudio.com/

---

### 📦 Paso 1: Clonar/Descargar el Proyecto

```bash
# Si tienes Git:
git clone <url-del-repositorio>
cd autoparts-pro

# O simplemente descarga el ZIP y extrae la carpeta
```

---

### 🎨 Paso 2: Abrir en Visual Studio Code

```bash
# Desde la terminal:
code .

# O abre VS Code y usa:
# Archivo → Abrir Carpeta → Selecciona la carpeta del proyecto
```

---

### 🔌 Paso 3: Instalar Extensiones Recomendadas

VS Code detectará automáticamente las extensiones recomendadas en `.vscode/extensions.json`.

**Extensiones esenciales:**

1. **ESLint** - `dbaeumer.vscode-eslint`
2. **Prettier** - `esbenp.prettier-vscode`
3. **Tailwind CSS IntelliSense** - `bradlc.vscode-tailwindcss`
4. **ES7+ React/Redux/React-native snippets** - `dsznajder.es7-react-js-snippets`
5. **Auto Rename Tag** - `formulahendry.auto-rename-tag`
6. **Path Intellisense** - `christian-kohler.path-intellisense`
7. **Material Icon Theme** - `pkief.material-icon-theme`
8. **One Dark Pro** (tema) - `zhuangtongfa.material-theme`

**Para instalar:**
- Abre VS Code
- Ve a la pestaña de Extensiones (Ctrl+Shift+X)
- Busca cada extensión por nombre e instálala

---

### 📥 Paso 4: Instalar Dependencias

Abre la terminal en VS Code:
```bash
# Terminal → Nueva Terminal (Ctrl+`)
npm install
```

Esto instalará todas las dependencias necesarias (React, Tailwind, Lucide Icons, etc.)

---

### 🚀 Paso 5: Ejecutar el Proyecto

```bash
# Modo desarrollo (con hot reload):
npm run dev

# El servidor se iniciará en:
# http://localhost:5173
```

**Atajos útiles en VS Code:**
- `Ctrl+Shift+P` → Command Palette
- `Ctrl+`` → Abrir/cerrar terminal
- `Ctrl+Shift+B` → Ejecutar tarea de build
- `F5` → Iniciar debug con Chrome

---

### 🏗️ Paso 6: Build para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`

---

## 🎯 Cuentas de Demo

| Rol | Email | Contraseña |
|-----|-------|------------|
| **Admin** | admin@autoparts.com | admin123 |
| **Vendedor** | vendedor@autoparts.com | vendedor123 |
| **Cliente** | cliente@email.com | cliente123 |

---

## 📁 Estructura del Proyecto

```
autoparts-pro/
├── .vscode/              # Configuración de VS Code
│   ├── extensions.json   # Extensiones recomendadas
│   ├── settings.json     # Configuración del editor
│   ├── launch.json       # Configuración de debug
│   └── tasks.json        # Tareas automatizadas
├── src/
│   ├── components/       # Componentes reutilizables
│   │   └── Layout.tsx
│   ├── context/          # Context API (estado global)
│   │   └── AuthContext.tsx
│   ├── data/             # Datos mock
│   │   └── mockData.ts
│   ├── pages/            # Páginas principales
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── CatalogPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── OrdersPage.tsx
│   │   ├── ChatPage.tsx
│   │   ├── SettingsPage.tsx
│   │   ├── UsersPage.tsx
│   │   └── SellerProfilePage.tsx
│   ├── types/            # Tipos TypeScript
│   │   └── index.ts
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Entry point
│   └── index.css         # Estilos globales
├── database/             # Configuración de base de datos
│   ├── schemas.js        # Esquemas MongoDB
│   ├── config.js         # Configuración
│   └── prisma/           # Schema Prisma (PostgreSQL)
├── .gitignore
├── .prettierrc
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🎨 Características del Diseño

✨ **UI Premium con:**
- Mesh gradients y glassmorphism
- Partículas flotantes animadas
- Efectos hover 3D
- Animaciones CSS avanzadas (float, morph, shimmer)
- Gradientes animados en textos
- Neon glow y micro-interacciones
- Diseño responsive (mobile-first)
- Dark theme sofisticado

---

## 👥 Roles del Sistema

### 🔴 Administrador
- Control total del sistema
- Gestionar usuarios (verificar, desactivar)
- Configurar métodos de verificación (email/SMS)
- Aprobar vendedores manualmente
- Configurar precios de suscripción
- Activar/desactivar modo mantenimiento

### 🔵 Vendedor
- Dos formas de unirse:
  1. **Mensualidad**: Paga RD$1,500/mes automáticamente
  2. **Aprobación admin**: Contacta a administración
- Gestionar perfil de negocio (ubicación, horario, descripción)
- Publicar productos con fotos, precios y compatibilidad
- Ver y gestionar pedidos recibidos
- Chat con clientes (asistido por IA)

### 🟢 Cliente
- Explorar catálogo completo
- Buscar por nombre, vehículo, categoría, ciudad
- Ver detalles de productos y ubicación del vendedor
- Agregar al carrito y comprar
- Elegir envío a domicilio o recoger en tienda
- Pagar con tarjeta Atlantic, transferencia o efectivo
- Chat con asistente IA para consultas
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

Ver archivos en `/database` para esquemas completos.

---

## 🚀 Para Producción

1. **Backend**: Node.js + Express + Mongoose/Prisma
2. **Base de datos**: MongoDB Atlas o Supabase (PostgreSQL)
3. **Auth**: JWT + refresh tokens
4. **Pagos**: API de Atlantic o Stripe
5. **IA Chat**: OpenAI API
6. **Email**: SendGrid o Nodemailer
7. **SMS**: Twilio
8. **Storage**: AWS S3 o Cloudinary para imágenes
9. **Hosting**: Vercel (frontend) + Railway/Render (backend)

---

## 🛠️ Tecnologías

- **React 18** con TypeScript
- **Vite** (build tool ultrarrápido)
- **Tailwind CSS** (utility-first CSS)
- **Lucide React** (iconos modernos)
- **Context API** (estado global)
- **React Router** (navegación)
- **Responsive design** (mobile-first)
- **Dark theme** con glassmorphism

---

## 📝 Comandos Útiles

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo

# Build
npm run build        # Compilar para producción
npm run preview      # Previsualizar build de producción

# Linting
npm run lint         # Ejecutar ESLint

# Instalación
npm install          # Instalar dependencias
npm install <paquete> # Instalar nuevo paquete
```

---

## 🐛 Debugging en VS Code

1. Abre el archivo que quieres debuggear
2. Coloca breakpoints (clic en el margen izquierdo)
3. Presiona `F5` o ve a Run → Start Debugging
4. Se abrirá Chrome con el debugger conectado
5. Usa la pestaña de Debug para inspeccionar variables

---

## 📚 Recursos Adicionales

- [Documentación de React](https://react.dev/)
- [Documentación de Tailwind CSS](https://tailwindcss.com/)
- [Documentación de Vite](https://vitejs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📧 Contacto

Para preguntas o soporte, contacta al equipo de desarrollo.

---

**¡Disfruta trabajando con AutoParts Pro!** 🚗💨
