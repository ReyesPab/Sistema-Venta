import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { hashPassword, verifyPassword, generateSalt } from '../utils/crypto';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, phone: string, password: string, role: UserRole) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isLoading: boolean;
  loginAttempts: number;
  isLocked: boolean;
  lockoutRemaining: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================
// USUARIOS DEMO CON CONTRASEÑAS CIFRADAS
// ============================================

interface StoredUser extends User {
  passwordHash: string;
  passwordSalt: string;
}

// Generar hashes para las contraseñas demo
function initializeDemoUsers(): StoredUser[] {
  const demoPasswords = [
    { email: 'admin@autoparts.com', password: 'admin123' },
    { email: 'vendedor@autoparts.com', password: 'vendedor123' },
    { email: 'cliente@email.com', password: 'cliente123' },
  ];

  const baseUsers: User[] = [
    {
      id: '1',
      name: 'Admin Principal',
      email: 'admin@autoparts.com',
      phone: '+1 809-555-0001',
      role: 'admin',
      verified: true,
      createdAt: '2024-01-01',
    },
    {
      id: '2',
      name: 'AutoParts Santo Domingo',
      email: 'vendedor@autoparts.com',
      phone: '+1 809-555-0002',
      role: 'seller',
      verified: true,
      createdAt: '2024-02-15',
    },
    {
      id: '3',
      name: 'Carlos Cliente',
      email: 'cliente@email.com',
      phone: '+1 809-555-0003',
      role: 'client',
      verified: true,
      createdAt: '2024-03-01',
    },
  ];

  return baseUsers.map((user, index) => {
    const { hash, salt } = hashPassword(demoPasswords[index].password);
    return {
      ...user,
      passwordHash: hash,
      passwordSalt: salt,
    };
  });
}

const DEMO_USERS = initializeDemoUsers();

// ============================================
// CONFIGURACIÓN DE SEGURIDAD
// ============================================

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutos para demo (15 min en producción)

// ============================================
// AUTH PROVIDER
// ============================================

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  // Verificar lockout periódicamente
  useEffect(() => {
    if (!lockoutUntil) return;

    const interval = setInterval(() => {
      const remaining = lockoutUntil - Date.now();
      if (remaining <= 0) {
        setLockoutUntil(null);
        setLoginAttempts(0);
        setLockoutRemaining(0);
        clearInterval(interval);
      } else {
        setLockoutRemaining(Math.ceil(remaining / 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lockoutUntil]);

  // Cargar sesión guardada
  useEffect(() => {
    const stored = localStorage.getItem('autoparts_user');
    const sessionToken = localStorage.getItem('autoparts_session');
    
    if (stored && sessionToken) {
      // Verificar que la sesión no haya expirado
      const sessionData = JSON.parse(atob(sessionToken));
      if (sessionData.expiresAt > Date.now()) {
        setUser(JSON.parse(stored));
      } else {
        // Sesión expirada, limpiar
        localStorage.removeItem('autoparts_user');
        localStorage.removeItem('autoparts_session');
      }
    }
    setIsLoading(false);
  }, []);

  const isLocked = lockoutUntil !== null && lockoutUntil > Date.now();

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    // Verificar lockout
    if (isLocked) {
      return { 
        success: false, 
        message: `Cuenta bloqueada. Intenta de nuevo en ${Math.ceil(lockoutRemaining / 60)}:${(lockoutRemaining % 60).toString().padStart(2, '0')}` 
      };
    }

    setIsLoading(true);
    
    // Simular latencia de red
    await new Promise(resolve => setTimeout(resolve, 800));

    // Buscar en usuarios demo
    const demoUser = DEMO_USERS.find(u => u.email === email.toLowerCase());
    if (demoUser) {
      const isValid = verifyPassword(password, demoUser.passwordHash, demoUser.passwordSalt);
      
      if (isValid) {
        // Login exitoso - resetear intentos
        setLoginAttempts(0);
        
        const { passwordHash, passwordSalt, ...userData } = demoUser;
        setUser(userData);
        localStorage.setItem('autoparts_user', JSON.stringify(userData));
        
        // Crear token de sesión
        const sessionData = {
          userId: userData.id,
          createdAt: Date.now(),
          expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 días
        };
        localStorage.setItem('autoparts_session', btoa(JSON.stringify(sessionData)));
        
        setIsLoading(false);
        return { success: true, message: 'Inicio de sesión exitoso' };
      } else {
        // Contraseña incorrecta
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
          setLockoutUntil(Date.now() + LOCKOUT_DURATION);
          setIsLoading(false);
          return { 
            success: false, 
            message: `Credenciales incorrectas. Cuenta bloqueada por ${LOCKOUT_DURATION / 60000} minutos.` 
          };
        }
        
        setIsLoading(false);
        return { 
          success: false, 
          message: `Credenciales incorrectas. Intentos restantes: ${MAX_LOGIN_ATTEMPTS - newAttempts}` 
        };
      }
    }

    // Buscar en usuarios registrados
    const registered = JSON.parse(localStorage.getItem('autoparts_registered') || '[]') as StoredUser[];
    const regUser = registered.find(u => u.email === email.toLowerCase());
    
    if (regUser) {
      const isValid = verifyPassword(password, regUser.passwordHash, regUser.passwordSalt);
      
      if (isValid) {
        setLoginAttempts(0);
        
        const { passwordHash, passwordSalt, ...userData } = regUser;
        setUser(userData);
        localStorage.setItem('autoparts_user', JSON.stringify(userData));
        
        const sessionData = {
          userId: userData.id,
          createdAt: Date.now(),
          expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
        };
        localStorage.setItem('autoparts_session', btoa(JSON.stringify(sessionData)));
        
        setIsLoading(false);
        return { success: true, message: 'Inicio de sesión exitoso' };
      } else {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
          setLockoutUntil(Date.now() + LOCKOUT_DURATION);
          setIsLoading(false);
          return { 
            success: false, 
            message: `Credenciales incorrectas. Cuenta bloqueada por ${LOCKOUT_DURATION / 60000} minutos.` 
          };
        }
        
        setIsLoading(false);
        return { 
          success: false, 
          message: `Credenciales incorrectas. Intentos restantes: ${MAX_LOGIN_ATTEMPTS - newAttempts}` 
        };
      }
    }

    // Usuario no encontrado
    setIsLoading(false);
    return { success: false, message: 'Usuario no encontrado. Verifica tu correo electrónico.' };
  };

  const register = async (
    name: string, 
    email: string, 
    phone: string, 
    password: string, 
    role: UserRole
  ): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    // Verificar que el email no exista
    const allUsers = [...DEMO_USERS];
    const registered = JSON.parse(localStorage.getItem('autoparts_registered') || '[]') as StoredUser[];
    allUsers.push(...registered);

    if (allUsers.find(u => u.email === email.toLowerCase())) {
      setIsLoading(false);
      return { success: false, message: 'Este correo ya está registrado.' };
    }

    // Cifrar contraseña
    const { hash, salt } = hashPassword(password);

    const newUser: StoredUser = {
      id: Date.now().toString(),
      name,
      email: email.toLowerCase(),
      phone,
      role,
      verified: role === 'client',
      createdAt: new Date().toISOString(),
      passwordHash: hash,
      passwordSalt: salt,
    };

    // Guardar usuario registrado
    registered.push(newUser);
    localStorage.setItem('autoparts_registered', JSON.stringify(registered));

    // Auto-login
    const { passwordHash, passwordSalt, ...userData } = newUser;
    setUser(userData);
    localStorage.setItem('autoparts_user', JSON.stringify(userData));

    const sessionData = {
      userId: userData.id,
      createdAt: Date.now(),
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    };
    localStorage.setItem('autoparts_session', btoa(JSON.stringify(sessionData)));

    setIsLoading(false);
    return { success: true, message: 'Cuenta creada exitosamente' };
  };

  const logout = () => {
    setUser(null);
    setLoginAttempts(0);
    setLockoutUntil(null);
    setLockoutRemaining(0);
    localStorage.removeItem('autoparts_user');
    localStorage.removeItem('autoparts_session');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isLoading,
      loginAttempts,
      isLocked,
      lockoutRemaining,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
