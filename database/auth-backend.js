/**
 * ============================================
 * BACKEND - Sistema de Cifrado de Contraseñas
 * ============================================
 * 
 * Este archivo es para el SERVIDOR (Node.js/Express)
 * NO se ejecuta en el navegador
 * 
 * En producción, TODA la lógica de cifrado debe estar
 * en el backend. El frontend solo envía la contraseña
 * en texto plano sobre HTTPS.
 */

// ============================================
// DEPENDENCIAS NECESARIAS (npm install)
// ============================================
// npm install bcryptjs jsonwebtoken express-rate-limit helmet

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ============================================
// CONFIGURACIÓN
// ============================================

const CONFIG = {
  // Bcrypt
  SALT_ROUNDS: 12, // 12 rounds = ~250ms por hash (óptimo seguridad/velocidad)
  
  // Pepper global (de variables de entorno)
  PASSWORD_PEPPER: process.env.PASSWORD_PEPPER || 'change-this-in-production-env',
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-jwt-secret-key',
  JWT_EXPIRES_IN: '7d',
  JWT_REFRESH_EXPIRES_IN: '30d',
  
  // Rate limiting
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutos
  
  // Password requirements
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
};

// ============================================
// HASHING DE CONTRASEÑAS
// ============================================

/**
 * Hashea una contraseña con bcrypt + pepper
 * 
 * @param {string} password - Contraseña en texto plano
 * @returns {Promise<string>} Hash de la contraseña
 */
async function hashPassword(password) {
  // Agregar pepper antes del hashing
  const passwordWithPepper = password + CONFIG.PASSWORD_PEPPER;
  
  // Hash con bcrypt (12 rounds)
  const salt = await bcrypt.genSalt(CONFIG.SALT_ROUNDS);
  const hash = await bcrypt.hash(passwordWithPepper, salt);
  
  return hash;
}

/**
 * Verifica una contraseña contra un hash
 * 
 * @param {string} password - Contraseña a verificar
 * @param {string} storedHash - Hash almacenado en la BD
 * @returns {Promise<boolean>} true si la contraseña es correcta
 */
async function verifyPassword(password, storedHash) {
  // Agregar pepper antes de verificar
  const passwordWithPepper = password + CONFIG.PASSWORD_PEPPER;
  
  // Comparar con bcrypt (timing-safe)
  return await bcrypt.compare(passwordWithPepper, storedHash);
}

// ============================================
// VALIDACIÓN DE CONTRASEÑAS
// ============================================

/**
 * Valida que una contraseña cumpla los requisitos
 * 
 * @param {string} password - Contraseña a validar
 * @returns {{ valid: boolean, errors: string[] }}
 */
function validatePassword(password) {
  const errors = [];
  
  if (password.length < CONFIG.MIN_PASSWORD_LENGTH) {
    errors.push(`Mínimo ${CONFIG.MIN_PASSWORD_LENGTH} caracteres`);
  }
  
  if (password.length > CONFIG.MAX_PASSWORD_LENGTH) {
    errors.push(`Máximo ${CONFIG.MAX_PASSWORD_LENGTH} caracteres`);
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Debe contener al menos una mayúscula');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Debe contener al menos una minúscula');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Debe contener al menos un número');
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Debe contener al menos un carácter especial');
  }
  
  // Verificar contraseñas comunes
  const commonPasswords = [
    'password', '123456', '12345678', 'qwerty', 'abc123',
    'admin123', 'letmein', 'welcome', 'monkey', 'dragon'
  ];
  
  if (commonPasswords.includes(password.toLowerCase())) {
    errors.push('Esta contraseña es demasiado común');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

// ============================================
// GESTIÓN DE INTENTOS DE LOGIN
// ============================================

/**
 * Middleware para rate limiting de login
 */
function createLoginRateLimiter() {
  const loginAttempts = new Map();
  
  return {
    /**
     * Verifica si un IP/email está bloqueado
     */
    checkLimit(identifier) {
      const record = loginAttempts.get(identifier);
      
      if (!record) return { allowed: true, remaining: CONFIG.MAX_LOGIN_ATTEMPTS };
      
      // Resetear si pasó el tiempo de bloqueo
      if (Date.now() > record.lockoutUntil) {
        loginAttempts.delete(identifier);
        return { allowed: true, remaining: CONFIG.MAX_LOGIN_ATTEMPTS };
      }
      
      // Si está bloqueado
      if (record.attempts >= CONFIG.MAX_LOGIN_ATTEMPTS) {
        const remaining = Math.ceil((record.lockoutUntil - Date.now()) / 1000);
        return { allowed: false, remaining: 0, lockoutSeconds: remaining };
      }
      
      return { 
        allowed: true, 
        remaining: CONFIG.MAX_LOGIN_ATTEMPTS - record.attempts 
      };
    },
    
    /**
     * Registra un intento fallido
     */
    recordFailedAttempt(identifier) {
      const record = loginAttempts.get(identifier) || {
        attempts: 0,
        lockoutUntil: 0
      };
      
      record.attempts += 1;
      
      // Si alcanzó el máximo, bloquear
      if (record.attempts >= CONFIG.MAX_LOGIN_ATTEMPTS) {
        record.lockoutUntil = Date.now() + CONFIG.LOCKOUT_DURATION;
      }
      
      loginAttempts.set(identifier, record);
      
      return {
        attempts: record.attempts,
        locked: record.attempts >= CONFIG.MAX_LOGIN_ATTEMPTS,
        lockoutUntil: record.lockoutUntil
      };
    },
    
    /**
     * Resetea los intentos (login exitoso)
     */
    resetAttempts(identifier) {
      loginAttempts.delete(identifier);
    }
  };
}

// ============================================
// GENERACIÓN DE JWT
// ============================================

/**
 * Genera un token JWT para el usuario
 */
function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  
  return jwt.sign(payload, CONFIG.JWT_SECRET, {
    expiresIn: CONFIG.JWT_EXPIRES_IN,
  });
}

/**
 * Genera un refresh token
 */
function generateRefreshToken(user) {
  const payload = {
    id: user.id,
    type: 'refresh',
  };
  
  return jwt.sign(payload, CONFIG.JWT_SECRET, {
    expiresIn: CONFIG.JWT_REFRESH_EXPIRES_IN,
  });
}

/**
 * Verifica un token JWT
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, CONFIG.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// ============================================
// EJEMPLO DE USO EN EXPRESS
// ============================================

/*
const express = require('express');
const app = express();
app.use(express.json());

const rateLimiter = createLoginRateLimiter();

// REGISTRO
app.post('/api/auth/register', async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  
  // 1. Validar contraseña
  const validation = validatePassword(password);
  if (!validation.valid) {
    return res.status(400).json({ 
      success: false, 
      errors: validation.errors 
    });
  }
  
  // 2. Verificar que el email no exista
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email ya registrado' 
    });
  }
  
  // 3. Hashear contraseña
  const passwordHash = await hashPassword(password);
  
  // 4. Crear usuario
  const user = new User({
    name,
    email,
    phone,
    role,
    passwordHash,
  });
  
  await user.save();
  
  // 5. Generar token
  const token = generateToken(user);
  const refreshToken = generateRefreshToken(user);
  
  res.json({
    success: true,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token,
    refreshToken,
  });
});

// LOGIN
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const ip = req.ip;
  
  // 1. Verificar rate limit
  const limit = rateLimiter.checkLimit(email);
  if (!limit.allowed) {
    return res.status(429).json({
      success: false,
      message: `Cuenta bloqueada. Intenta en ${limit.lockoutSeconds} segundos`,
    });
  }
  
  // 2. Buscar usuario
  const user = await User.findOne({ email });
  if (!user) {
    rateLimiter.recordFailedAttempt(email);
    return res.status(401).json({
      success: false,
      message: 'Credenciales incorrectas',
    });
  }
  
  // 3. Verificar contraseña
  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    const result = rateLimiter.recordFailedAttempt(email);
    return res.status(401).json({
      success: false,
      message: result.locked 
        ? `Cuenta bloqueada por ${CONFIG.LOCKOUT_DURATION / 60000} minutos`
        : `Credenciales incorrectas. Intentos restantes: ${result.attempts}/${CONFIG.MAX_LOGIN_ATTEMPTS}`,
    });
  }
  
  // 4. Login exitoso
  rateLimiter.resetAttempts(email);
  
  const token = generateToken(user);
  const refreshToken = generateRefreshToken(user);
  
  res.json({
    success: true,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token,
    refreshToken,
  });
});
*/

// ============================================
// EXPORTS
// ============================================

module.exports = {
  CONFIG,
  hashPassword,
  verifyPassword,
  validatePassword,
  createLoginRateLimiter,
  generateToken,
  generateRefreshToken,
  verifyToken,
};
