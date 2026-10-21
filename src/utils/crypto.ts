/**
 * ============================================
 * MÓDULO DE CIFRADO - AutoParts Pro
 * ============================================
 * 
 * Sistema de cifrado de contraseñas con múltiples capas:
 * 1. SHA-256 Hashing (criptográfico)
 * 2. Salt único por usuario (previene rainbow tables)
 * 3. Pepper global del sistema (capa adicional)
 * 4. Validación de fortaleza de contraseña
 * 5. Generación de tokens seguros
 * 
 * NOTA: En producción, el hashing debe hacerse en el BACKEND
 * con bcrypt (12+ rounds). Este módulo es para el frontend demo.
 */

import CryptoJS from 'crypto-js';

// ============================================
// CONFIGURACIÓN DEL SISTEMA DE CIFRADO
// ============================================

/**
 * Pepper global del sistema - capa adicional de seguridad
 * En producción, esto debe estar en variables de entorno del servidor
 * NUNCA debe estar expuesto en el frontend
 */
const SYSTEM_PEPPER = 'AutoParts_Pro_2024_S3cur3_P3pp3r_K3y!@#$%';

/**
 * Número de iteraciones para el key stretching
 * Más iteraciones = más seguro pero más lento
 */
const KEY_STRETCH_ITERATIONS = 1000;

/**
 * Longitud mínima del salt
 */
const SALT_LENGTH = 32;

// ============================================
// GENERACIÓN DE SALT
// ============================================

/**
 * Genera un salt criptográficamente seguro
 * @param length - Longitud del salt en caracteres
 * @returns Salt aleatorio
 */
export function generateSalt(length: number = SALT_LENGTH): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// ============================================
// HASHING DE CONTRASEÑAS
// ============================================

/**
 * Hashea una contraseña con salt + pepper + key stretching
 * 
 * Proceso:
 * 1. Concatena: password + salt + pepper
 * 2. Aplica SHA-256 múltiples veces (key stretching)
 * 3. Retorna hash + salt (para verificación futura)
 * 
 * @param password - Contraseña en texto plano
 * @param salt - Salt único (se genera si no se proporciona)
 * @returns Objeto con hash y salt
 */
export function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const userSalt = salt || generateSalt();
  
  // Paso 1: Concatenar password + salt + pepper
  let combined = password + userSalt + SYSTEM_PEPPER;
  
  // Paso 2: Key stretching (múltiples iteraciones de SHA-256)
  let hash = CryptoJS.SHA256(combined).toString();
  
  for (let i = 1; i < KEY_STRETCH_ITERATIONS; i++) {
    hash = CryptoJS.SHA256(hash + userSalt).toString();
  }
  
  // Paso 3: Hash final con pepper adicional
  const finalHash = CryptoJS.SHA256(hash + SYSTEM_PEPPER).toString();
  
  return {
    hash: finalHash,
    salt: userSalt
  };
}

/**
 * Verifica una contraseña contra un hash almacenado
 * 
 * @param password - Contraseña a verificar
 * @param storedHash - Hash almacenado
 * @param storedSalt - Salt almacenado
 * @returns true si la contraseña es correcta
 */
export function verifyPassword(password: string, storedHash: string, storedSalt: string): boolean {
  const { hash } = hashPassword(password, storedSalt);
  
  // Comparación en tiempo constante (previene timing attacks)
  return timingSafeEqual(hash, storedHash);
}

/**
 * Comparación en tiempo constante
 * Previene ataques de timing que pueden revelar información
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  
  return result === 0;
}

// ============================================
// VALIDACIÓN DE FORTALEZA
// ============================================

export interface PasswordStrength {
  score: number; // 0-100
  level: 'very_weak' | 'weak' | 'fair' | 'strong' | 'very_strong';
  label: string;
  color: string;
  suggestions: string[];
  checks: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumbers: boolean;
    hasSpecialChars: boolean;
    noCommonPasswords: boolean;
    noSequentialChars: boolean;
    sufficientLength: boolean;
  };
}

/**
 * Lista de contraseñas comunes (top 100 simplificada)
 */
const COMMON_PASSWORDS = [
  'password', '123456', '12345678', 'qwerty', 'abc123',
  'monkey', '1234567', 'letmein', 'trustno1', 'dragon',
  'baseball', 'iloveyou', 'master', 'sunshine', 'ashley',
  'bailey', 'shadow', '123123', '654321', 'superman',
  'qazwsx', 'michael', 'football', 'password1', 'password123',
  'admin123', 'vendedor123', 'cliente123', 'welcome', 'hello'
];

/**
 * Analiza la fortaleza de una contraseña
 * 
 * @param password - Contraseña a analizar
 * @returns Objeto con análisis completo de fortaleza
 */
export function analyzePasswordStrength(password: string): PasswordStrength {
  const checks = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumbers: /[0-9]/.test(password),
    hasSpecialChars: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    noCommonPasswords: !COMMON_PASSWORDS.includes(password.toLowerCase()),
    noSequentialChars: !hasSequentialChars(password),
    sufficientLength: password.length >= 12,
  };
  
  // Calcular score (0-100)
  let score = 0;
  
  // Longitud (hasta 30 puntos)
  score += Math.min(password.length * 3, 30);
  
  // Complejidad de caracteres (hasta 40 puntos)
  if (checks.hasUppercase) score += 10;
  if (checks.hasLowercase) score += 10;
  if (checks.hasNumbers) score += 10;
  if (checks.hasSpecialChars) score += 10;
  
  // Bonus por longitud extra (hasta 15 puntos)
  if (password.length >= 12) score += 5;
  if (password.length >= 16) score += 5;
  if (password.length >= 20) score += 5;
  
  // Penalizaciones
  if (!checks.noCommonPasswords) score -= 30;
  if (!checks.noSequentialChars) score -= 15;
  if (password.length < 8) score -= 20;
  
  // Asegurar que el score esté entre 0 y 100
  score = Math.max(0, Math.min(100, score));
  
  // Determinar nivel
  let level: PasswordStrength['level'];
  let label: string;
  let color: string;
  
  if (score < 20) {
    level = 'very_weak';
    label = 'Muy Débil';
    color = 'red';
  } else if (score < 40) {
    level = 'weak';
    label = 'Débil';
    color = 'orange';
  } else if (score < 60) {
    level = 'fair';
    label = 'Aceptable';
    color = 'yellow';
  } else if (score < 80) {
    level = 'strong';
    label = 'Fuerte';
    color = 'green';
  } else {
    level = 'very_strong';
    label = 'Muy Fuerte';
    color = 'emerald';
  }
  
  // Generar sugerencias
  const suggestions: string[] = [];
  if (!checks.minLength) suggestions.push('Usa al menos 8 caracteres');
  if (!checks.hasUppercase) suggestions.push('Agrega letras mayúsculas (A-Z)');
  if (!checks.hasLowercase) suggestions.push('Agrega letras minúsculas (a-z)');
  if (!checks.hasNumbers) suggestions.push('Agrega números (0-9)');
  if (!checks.hasSpecialChars) suggestions.push('Agrega caracteres especiales (!@#$%)');
  if (!checks.noCommonPasswords) suggestions.push('Evita contraseñas comunes');
  if (!checks.noSequentialChars) suggestions.push('Evita secuencias (123, abc)');
  if (!checks.sufficientLength) suggestions.push('Usa 12+ caracteres para máxima seguridad');
  
  return { score, level, label, color, suggestions, checks };
}

/**
 * Detecta caracteres secuenciales (123, abc, qwerty)
 */
function hasSequentialChars(password: string): boolean {
  const lower = password.toLowerCase();
  const sequences = [
    'abcdefghijklmnopqrstuvwxyz',
    '01234567890',
    'qwertyuiop',
    'asdfghjkl',
    'zxcvbnm'
  ];
  
  for (const seq of sequences) {
    for (let i = 0; i <= seq.length - 3; i++) {
      const subseq = seq.substring(i, i + 3);
      if (lower.includes(subseq)) return true;
      if (lower.includes(subseq.split('').reverse().join(''))) return true;
    }
  }
  
  return false;
}

// ============================================
// GENERACIÓN DE TOKENS
// ============================================

/**
 * Genera un token seguro para verificación
 * @param length - Longitud del token en bytes
 * @returns Token hexadecimal
 */
export function generateSecureToken(length: number = 32): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Genera un código de verificación numérico
 * @param length - Número de dígitos (default: 6)
 * @returns Código numérico
 */
export function generateVerificationCode(length: number = 6): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => (byte % 10).toString()).join('');
}

/**
 * Genera un código de verificación alfanumérico
 * @param length - Longitud del código
 * @returns Código alfanumérico
 */
export function generateAlphanumericCode(length: number = 8): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Sin I, O, 0, 1 para evitar confusión
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => chars[byte % chars.length]).join('');
}

// ============================================
// CIFRADO DE DATOS SENSIBLES
// ============================================

/**
 * Cifra datos sensibles con AES-256
 * @param data - Datos a cifrar
 * @param key - Clave de cifrado
 * @returns Datos cifrados
 */
export function encryptData(data: string, key: string): string {
  const encrypted = CryptoJS.AES.encrypt(data, key + SYSTEM_PEPPER);
  return encrypted.toString();
}

/**
 * Descifra datos cifrados con AES-256
 * @param encryptedData - Datos cifrados
 * @param key - Clave de cifrado
 * @returns Datos descifrados
 */
export function decryptData(encryptedData: string, key: string): string {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, key + SYSTEM_PEPPER);
  return decrypted.toString(CryptoJS.enc.Utf8);
}

// ============================================
// UTILIDADES ADICIONALES
// ============================================

/**
 * Genera un hash rápido (para tokens de sesión, no contraseñas)
 */
export function quickHash(data: string): string {
  return CryptoJS.SHA256(data + SYSTEM_PEPPER).toString();
}

/**
 * Enmascara una contraseña para visualización
 * @param password - Contraseña
 * @returns Contraseña enmascarada (ej: "p****d")
 */
export function maskPassword(password: string): string {
  if (password.length <= 2) return '*'.repeat(password.length);
  return password[0] + '*'.repeat(password.length - 2) + password[password.length - 1];
}

/**
 * Enmascara un email para visualización
 * @param email - Email
 * @returns Email enmascarado (ej: "j***@email.com")
 */
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (local.length <= 2) return '*'.repeat(local.length) + '@' + domain;
  return local[0] + '***' + '@' + domain;
}

/**
 * Enmascara un número de tarjeta
 * @param cardNumber - Número de tarjeta
 * @returns Número enmascarado (ej: "****4521")
 */
export function maskCardNumber(cardNumber: string): string {
  const clean = cardNumber.replace(/\s/g, '');
  if (clean.length < 4) return '****';
  return '****'.repeat(Math.floor((clean.length - 4) / 4)) + clean.slice(-4);
}

// ============================================
// EXPORTS PARA BACKEND (referencia)
// ============================================

/**
 * Configuración recomendada para el backend
 * 
 * En el servidor Node.js, usa bcrypt directamente:
 * 
 * ```javascript
 * const bcrypt = require('bcryptjs');
 * const SALT_ROUNDS = 12;
 * 
 * // Hash password
 * const hash = await bcrypt.hash(password, SALT_ROUNDS);
 * 
 * // Verify password
 * const isValid = await bcrypt.compare(password, hash);
 * ```
 */
export const BACKEND_CONFIG = {
  algorithm: 'bcrypt',
  saltRounds: 12,
  pepperEnvVar: 'PASSWORD_PEPPER',
  minPasswordLength: 8,
  maxLoginAttempts: 5,
  lockoutDuration: 15 * 60 * 1000, // 15 minutes
};
