import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { Car, Mail, Phone, Lock, User, Eye, EyeOff, ArrowRight, Shield, Wrench, ShoppingBag } from 'lucide-react';

export default function LoginPage() {
  const { login, register, isLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'client' as UserRole
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (isLogin) {
      const success = await login(formData.email, formData.password);
      if (!success) setError('Credenciales incorrectas. Intenta de nuevo.');
    } else {
      if (!formData.name || !formData.email || !formData.phone || !formData.password) {
        setError('Por favor completa todos los campos.');
        return;
      }
      const success = await register(formData.name, formData.email, formData.phone, formData.password, formData.role);
      if (!success) setError('Error al crear la cuenta. Intenta de nuevo.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl shadow-lg shadow-blue-500/30 mb-4">
            <Car className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">AutoParts Pro</h1>
          <p className="text-blue-200/70 mt-1">Sistema de Ventas de Partes Vehiculares</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Tabs */}
          <div className="flex bg-white/5 rounded-xl p-1 mb-6">
            <button
              onClick={() => { setIsLogin(true); setError(''); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isLogin ? 'bg-blue-500 text-white shadow-lg' : 'text-blue-200/70 hover:text-white'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                !isLogin ? 'bg-blue-500 text-white shadow-lg' : 'text-blue-200/70 hover:text-white'
              }`}
            >
              Registrarse
            </button>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4 text-red-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300/50" />
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-blue-200/40 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30 transition-all"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300/50" />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-blue-200/40 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30 transition-all"
                  />
                </div>

                {/* Role selection */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, role: 'client'})}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all ${
                      formData.role === 'client'
                        ? 'bg-blue-500/20 border-blue-400/50 text-blue-300'
                        : 'bg-white/5 border-white/10 text-blue-200/60 hover:border-white/20'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Cliente
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, role: 'seller'})}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all ${
                      formData.role === 'seller'
                        ? 'bg-blue-500/20 border-blue-400/50 text-blue-300'
                        : 'bg-white/5 border-white/10 text-blue-200/60 hover:border-white/20'
                    }`}
                  >
                    <Wrench className="w-4 h-4" />
                    Vendedor
                  </button>
                </div>
              </>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300/50" />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-blue-200/40 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30 transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300/50" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-11 pr-11 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-blue-200/40 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300/50 hover:text-blue-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Demo credentials */}
          {isLogin && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-blue-200/50 text-center mb-3 flex items-center justify-center gap-1">
                <Shield className="w-3 h-3" />
                Cuentas de demostración
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between bg-white/5 rounded-lg px-3 py-2">
                  <span className="text-blue-200/60">Admin:</span>
                  <span className="text-blue-300">admin@autoparts.com / admin123</span>
                </div>
                <div className="flex justify-between bg-white/5 rounded-lg px-3 py-2">
                  <span className="text-blue-200/60">Vendedor:</span>
                  <span className="text-blue-300">vendedor@autoparts.com / vendedor123</span>
                </div>
                <div className="flex justify-between bg-white/5 rounded-lg px-3 py-2">
                  <span className="text-blue-200/60">Cliente:</span>
                  <span className="text-blue-300">cliente@email.com / cliente123</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
