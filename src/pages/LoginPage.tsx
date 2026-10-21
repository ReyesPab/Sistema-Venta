import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { Car, Mail, Phone, Lock, User, Eye, EyeOff, ArrowRight, Shield, Wrench, ShoppingBag, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center mesh-gradient relative overflow-hidden p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px] animate-morph"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/15 rounded-full blur-[120px] animate-morph" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] animate-pulse"></div>
        
        {/* Floating particles */}
        {Array.from({length: 20}).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              opacity: 0.3 + Math.random() * 0.4,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }}
          />
        ))}

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="relative w-full max-w-md z-10 animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
            <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30 animate-float">
              <Car className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mt-5">
            <span className="gradient-text animate-text-gradient">AutoParts Pro</span>
          </h1>
          <p className="text-slate-400 mt-2 text-sm">Sistema de Ventas de Partes Vehiculares</p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
          {/* Shimmer effect on card */}
          <div className="absolute inset-0 shimmer pointer-events-none"></div>
          
          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-tr-full"></div>

          <div className="relative">
            {/* Tabs */}
            <div className="flex glass rounded-2xl p-1.5 mb-6">
              <button
                onClick={() => { setIsLogin(true); setError(''); }}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isLogin 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => { setIsLogin(false); setError(''); }}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  !isLogin 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Registrarse
              </button>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4 text-red-300 text-sm flex items-center gap-2 animate-slide-up">
                <div className="w-5 h-5 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs">!</span>
                </div>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center">
                      <User className="absolute left-4 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                      <input
                        type="text"
                        placeholder="Nombre completo"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-blue-400/50 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center">
                      <Phone className="absolute left-4 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                      <input
                        type="tel"
                        placeholder="Teléfono"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-blue-400/50 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Role selection */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, role: 'client'})}
                      className={`group relative flex items-center justify-center gap-2 py-3.5 rounded-xl border text-sm font-medium transition-all duration-300 overflow-hidden ${
                        formData.role === 'client'
                          ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-400/40 text-emerald-300 shadow-lg shadow-emerald-500/10'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Cliente
                      {formData.role === 'client' && (
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 animate-pulse"></div>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, role: 'seller'})}
                      className={`group relative flex items-center justify-center gap-2 py-3.5 rounded-xl border text-sm font-medium transition-all duration-300 overflow-hidden ${
                        formData.role === 'seller'
                          ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border-blue-400/40 text-blue-300 shadow-lg shadow-blue-500/10'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <Wrench className="w-4 h-4" />
                      Vendedor
                      {formData.role === 'seller' && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 animate-pulse"></div>
                      )}
                    </button>
                  </div>
                </>
              )}

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-blue-400/50 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-blue-400/50 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-slate-500 hover:text-blue-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Demo credentials */}
            {isLogin && (
              <div className="mt-6 pt-6 border-t border-white/5">
                <p className="text-xs text-slate-500 text-center mb-3 flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Cuentas de demostración
                </p>
                <div className="space-y-2">
                  {[
                    { label: 'Admin', email: 'admin@autoparts.com', pass: 'admin123', color: 'from-red-500/10 to-orange-500/10 border-red-500/20' },
                    { label: 'Vendedor', email: 'vendedor@autoparts.com', pass: 'vendedor123', color: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20' },
                    { label: 'Cliente', email: 'cliente@email.com', pass: 'cliente123', color: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20' },
                  ].map((demo, i) => (
                    <button
                      key={i}
                      onClick={() => setFormData({ ...formData, email: demo.email, password: demo.pass })}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-gradient-to-r ${demo.color} border hover:scale-[1.01] transition-all duration-200`}
                    >
                      <span className="text-xs font-medium text-slate-300">{demo.label}</span>
                      <span className="text-xs text-slate-400 font-mono">{demo.email}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
            <Shield className="w-3 h-3" />
            Conexión segura con encriptación SSL
          </p>
        </div>
      </div>
    </div>
  );
}
