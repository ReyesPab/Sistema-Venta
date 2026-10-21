import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users
const demoUsers: (User & { password: string })[] = [
  {
    id: '1',
    name: 'Admin Principal',
    email: 'admin@autoparts.com',
    phone: '+1 809-555-0001',
    role: 'admin',
    verified: true,
    createdAt: '2024-01-01',
    password: 'admin123'
  },
  {
    id: '2',
    name: 'AutoParts Santo Domingo',
    email: 'vendedor@autoparts.com',
    phone: '+1 809-555-0002',
    role: 'seller',
    verified: true,
    createdAt: '2024-02-15',
    password: 'vendedor123'
  },
  {
    id: '3',
    name: 'Carlos Cliente',
    email: 'cliente@email.com',
    phone: '+1 809-555-0003',
    role: 'client',
    verified: true,
    createdAt: '2024-03-01',
    password: 'cliente123'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('autoparts_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const found = demoUsers.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      localStorage.setItem('autoparts_user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }
    
    // Check registered users
    const registered = JSON.parse(localStorage.getItem('autoparts_registered') || '[]');
    const regFound = registered.find((u: any) => u.email === email && u.password === password);
    if (regFound) {
      const { password: _, ...userData } = regFound;
      setUser(userData);
      localStorage.setItem('autoparts_user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (name: string, email: string, phone: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      role,
      verified: role === 'client',
      createdAt: new Date().toISOString(),
      password
    };
    
    const registered = JSON.parse(localStorage.getItem('autoparts_registered') || '[]');
    registered.push(newUser);
    localStorage.setItem('autoparts_registered', JSON.stringify(registered));
    
    const { password: _, ...userData } = newUser;
    setUser(userData);
    localStorage.setItem('autoparts_user', JSON.stringify(userData));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('autoparts_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
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
