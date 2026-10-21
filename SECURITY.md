# 🔐 Sistema de Cifrado de Contraseñas - AutoParts Pro

## 📋 Resumen

El sistema implementa un **cifrado de contraseñas de múltiples capas** con las siguientes características:

- ✅ **SHA-256** - Algoritmo criptográfico de hashing
- ✅ **Salt único** - Generado por cada usuario (32 caracteres)
- ✅ **Pepper global** - Clave secreta del sistema
- ✅ **Key Stretching** - 1000 iteraciones para mayor seguridad
- ✅ **Comparación en tiempo constante** - Previene timing attacks
- ✅ **Validación de fortaleza** - Análisis en tiempo real
- ✅ **Bloqueo por intentos** - 5 intentos máximos
- ✅ **Tokens seguros** - Generación criptográfica

---

## 🏗️ Arquitectura del Cifrado

### Frontend (Demo/Desarrollo)
```
src/utils/crypto.ts
├── hashPassword()          → SHA-256 + Salt + Pepper + Key Stretching
├── verifyPassword()        → Verificación timing-safe
├── analyzePasswordStrength() → Análisis de fortaleza
├── generateSecureToken()   → Tokens criptográficos
├── generateVerificationCode() → Códigos SMS/Email
├── encryptData()           → Cifrado AES-256
├── decryptData()           → Descifrado AES-256
└── maskPassword/Email/Card → Enmascaramiento visual
```

### Backend (Producción)
```
database/auth-backend.js
├── hashPassword()          → bcrypt (12 rounds) + Pepper
├── verifyPassword()        → bcrypt.compare()
├── validatePassword()      → Validación de requisitos
├── createLoginRateLimiter() → Rate limiting
├── generateToken()         → JWT tokens
└── verifyToken()           → Verificación JWT
```

---

## 🔑 Proceso de Cifrado (Frontend)

```
┌─────────────────────────────────────────────────────────────┐
│                    CONTRASEÑA EN TEXTO PLANO                 │
│                      "MiPassword123!"                        │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  PASO 1: Generar Salt (32 bytes aleatorios)                 │
│  Salt: "a3f5b8c9d2e1f4a7b0c3d6e9f2a5b8c1d4e7f0a3b6c9d2"   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  PASO 2: Concatenar                                         │
│  password + salt + pepper                                   │
│  "MiPassword123!" + salt + SYSTEM_PEPPER                    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  PASO 3: Key Stretching (1000 iteraciones SHA-256)          │
│  hash = SHA256(combined)                                    │
│  for i in 1..1000:                                          │
│    hash = SHA256(hash + salt)                               │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  PASO 4: Hash Final                                         │
│  finalHash = SHA256(hash + pepper)                          │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  RESULTADO:                                                 │
│  Hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4..."      │
│  Salt: "a3f5b8c9d2e1f4a7b0c3d6e9f2a5b8c1d4e7f0a3b6c9d2"   │
│                                                             │
│  ⚠️ AMBOS se guardan en la base de datos                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔍 Proceso de Verificación

```
┌─────────────────────────────────────────────────────────────┐
│  Usuario ingresa contraseña: "MiPassword123!"               │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  Recuperar de BD:                                           │
│  - storedHash: "e3b0c44298fc1c149afbf4c8996fb924..."      │
│  - storedSalt: "a3f5b8c9d2e1f4a7b0c3d6e9f2a5b8c1..."      │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  Recalcular hash con la contraseña ingresada + storedSalt   │
│  newHash = hashPassword(input, storedSalt)                  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  Comparación en tiempo constante:                           │
│  timingSafeEqual(newHash, storedHash)                       │
│                                                             │
│  ✓ Si coinciden → Acceso concedido                         │
│  ✗ Si no coinciden → Acceso denegado                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛡️ Medidas de Seguridad

### 1. Salt Único por Usuario
- **Qué es**: Cadena aleatoria de 32 caracteres generada para cada usuario
- **Para qué**: Previene ataques de rainbow tables
- **Resultado**: Dos usuarios con la misma contraseña tendrán hashes diferentes

### 2. Pepper Global del Sistema
- **Qué es**: Clave secreta compartida por todo el sistema
- **Para qué**: Capa adicional de seguridad; si la BD se compromete, el atacante aún necesita el pepper
- **Ubicación**: Variable de entorno del servidor (NUNCA en el frontend en producción)

### 3. Key Stretching (1000 iteraciones)
- **Qué es**: Aplicar SHA-256 múltiples veces
- **Para qué**: Hacer el hashing más lento (~100ms), previniendo ataques de fuerza bruta
- **Balance**: Suficiente para ser seguro, no tanto para afectar UX

### 4. Comparación en Tiempo Constante
- **Qué es**: Comparar strings sin revelar información por tiempo de ejecución
- **Para qué**: Previene timing attacks que pueden revelar el hash correcto

### 5. Bloqueo por Intentos Fallidos
- **Límite**: 5 intentos fallidos
- **Bloqueo**: 5 minutos (demo) / 15 minutos (producción)
- **Reset**: Se reinicia al iniciar sesión exitosamente

### 6. Validación de Fortaleza
- **Longitud mínima**: 8 caracteres
- **Complejidad**: Mayúsculas, minúsculas, números, especiales
- **No comunes**: Bloquea contraseñas del top 100 más usadas
- **No secuenciales**: Detecta patrones como "123", "abc", "qwerty"

---

## 📊 Análisis de Fortaleza

El sistema analiza las contraseñas en tiempo real con un score de 0-100:

| Score | Nivel | Color | Descripción |
|-------|-------|-------|-------------|
| 0-19 | Muy Débil | 🔴 Rojo | Fácil de crackear |
| 20-39 | Débil | 🟠 Naranja | Vulnerable |
| 40-59 | Aceptable | 🟡 Amarillo | Uso básico |
| 60-79 | Fuerte | 🟢 Verde | Recomendado |
| 80-100 | Muy Fuerte | 💚 Esmeralda | Excelente |

### Criterios de puntuación:
- **Longitud** (hasta 30 pts): 3 pts por carácter
- **Mayúsculas** (10 pts)
- **Minúsculas** (10 pts)
- **Números** (10 pts)
- **Caracteres especiales** (10 pts)
- **Longitud extra** (hasta 15 pts): Bonus por 12+, 16+, 20+ caracteres

### Penalizaciones:
- Contraseña común: -30 pts
- Caracteres secuenciales: -15 pts
- Menos de 8 caracteres: -20 pts

---

## 🎮 Página de Demostración

Accede a la demo del sistema de cifrado desde el menú del **Administrador**:

```
Dashboard → Sistema Cifrado
```

### Funcionalidades de la demo:
1. **Hashing en tiempo real**: Ve cómo se genera el hash mientras escribes
2. **Verificación**: Prueba verificar contraseñas contra el hash
3. **Generación de tokens**: Tokens seguros y códigos de verificación
4. **Cifrado AES-256**: Cifra y descifra datos con una clave
5. **Enmascaramiento**: Ve cómo se ocultan datos sensibles

---

## 🚀 Producción: Backend con bcrypt

Para producción, **TODO el cifrado debe estar en el backend**:

### Instalación
```bash
npm install bcryptjs jsonwebtoken express-rate-limit helmet
```

### Configuración
```javascript
// database/auth-backend.js
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 12;
const PASSWORD_PEPPER = process.env.PASSWORD_PEPPER;

// Hash
async function hashPassword(password) {
  const withPepper = password + PASSWORD_PEPPER;
  return await bcrypt.hash(withPepper, SALT_ROUNDS);
}

// Verify
async function verifyPassword(password, hash) {
  const withPepper = password + PASSWORD_PEPPER;
  return await bcrypt.compare(withPepper, hash);
}
```

### Variables de Entorno
```env
# .env
PASSWORD_PEPPER=tu-pepper-secreto-aqui
JWT_SECRET=tu-jwt-secret-aqui
MAX_LOGIN_ATTEMPTS=5
LOCKOUT_DURATION=900000  # 15 minutos
```

---

## 📁 Archivos del Sistema

```
├── src/
│   ├── utils/
│   │   └── crypto.ts              # Módulo de cifrado frontend
│   ├── components/
│   │   └── PasswordStrengthMeter.tsx  # Indicador visual
│   ├── context/
│   │   └── AuthContext.tsx         # Autenticación con cifrado
│   └── pages/
│       ├── LoginPage.tsx           # Login con cifrado integrado
│       └── CryptoDemoPage.tsx      # Demo interactiva
│
├── database/
│   ├── auth-backend.js             # Backend con bcrypt
│   └── config.js                   # Configuración
│
└── SECURITY.md                     # Este archivo
```

---

## 🔒 Recomendaciones de Seguridad

### Para Producción:
1. ✅ **HTTPS obligatorio** - Todo el tráfico debe ser cifrado
2. ✅ **Backend para cifrado** - NUNCA cifrar contraseñas solo en el frontend
3. ✅ **bcrypt en servidor** - Más seguro que SHA-256 para contraseñas
4. ✅ **Variables de entorno** - Pepper y secretos en .env
5. ✅ **Rate limiting** - Prevenir ataques de fuerza bruta
6. ✅ **Helmet.js** - Headers de seguridad HTTP
7. ✅ **2FA** - Autenticación de dos factores para admin
8. ✅ **Logs de seguridad** - Registrar intentos fallidos
9. ✅ **Rotación de tokens** - Refresh tokens con expiración
10. ✅ **Auditoría regular** - Revisar logs y accesos

### NO HACER:
- ❌ Guardar contraseñas en texto plano
- ❌ Usar MD5 o SHA-1 (obsoletos)
- ❌ Salt predecible o compartido
- ❌ Mostrar errores específicos ("usuario no existe" vs "contraseña incorrecta")
- ❌ Limitar caracteres especiales en contraseñas
- ❌ Enviar contraseñas por email

---

## 🧪 Testing

### Probar el sistema:
1. Inicia sesión con las cuentas demo
2. Intenta contraseñas incorrectas (ver bloqueo)
3. Registra un usuario nuevo (ver hashing)
4. Visita "Sistema Cifrado" para ver la demo

### Cuentas demo:
| Rol | Email | Contraseña |
|-----|-------|------------|
| Admin | admin@autoparts.com | admin123 |
| Vendedor | vendedor@autoparts.com | vendedor123 |
| Cliente | cliente@email.com | cliente123 |

---

## 📚 Recursos

- [OWASP Password Storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [bcrypt documentation](https://github.com/kelektiv/node.bcrypt.js)
- [CryptoJS documentation](https://cryptojs.gitbook.io/docs/)
- [JWT.io](https://jwt.io/)

---

**Última actualización**: 2024
**Versión del sistema**: 1.0.0
**Algoritmo**: SHA-256 + Salt + Pepper + Key Stretching (1000 iteraciones)
