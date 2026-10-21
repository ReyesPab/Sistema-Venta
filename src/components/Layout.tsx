import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Car, LayoutDashboard, Package, ShoppingCart, Users, MessageSquare, Settings, LogOut, Menu, X, Bell, User as UserIcon, ChevronDown, Heart, Sparkles } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const getNavItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, gradient: 'from-blue-500 to-cyan-500' },
    ];

    if (user?.role === 'admin') {
      return [
        ...baseItems,
        { id: 'users', label: 'Usuarios', icon: Users, gradient: 'from-purple-500 to-pink-500' },
        { id: 'sellers', label: 'Vendedores', icon: UserIcon, gradient: 'from-emerald-500 to-teal-500' },
        { id: 'orders', label: 'Pedidos', icon: ShoppingCart, gradient: 'from-amber-500 to-orange-500' },
        { id: 'chat', label: 'Asistente AI', icon: MessageSquare, gradient: 'from-violet-500 to-purple-500' },
        { id: 'settings', label: 'Configuración', icon: Settings, gradient: 'from-slate-500 to-slate-600' },
      ];
    }

    if (user?.role === 'seller') {
      return [
        ...baseItems,
        { id: 'products', label: 'Mis Productos', icon: Package, gradient: 'from-emerald-500 to-green-500' },
        { id: 'orders', label: 'Pedidos', icon: ShoppingCart, gradient: 'from-amber-500 to-orange-500' },
        { id: 'profile', label: 'Mi Perfil', icon: UserIcon, gradient: 'from-blue-500 to-indigo-500' },
        { id: 'chat', label: 'Asistente AI', icon: MessageSquare, gradient: 'from-violet-500 to-purple-500' },
      ];
    }

    return [
      ...baseItems,
      { id: 'catalog', label: 'Venta de Partes', icon: Package, gradient: 'from-blue-500 to-indigo-500' },
      { id: 'orders', label: 'Mis Pedidos', icon: ShoppingCart, gradient: 'from-amber-500 to-orange-500' },
      { id: 'favorites', label: 'Favoritos', icon: Heart, gradient: 'from-rose-500 to-pink-500' },
      { id: 'chat', label: 'Asistente AI', icon: MessageSquare, gradient: 'from-violet-500 to-purple-500' },
    ];
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen mesh-gradient flex">
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full glass-strong border-r border-white/5">
          {/* Logo */}
          <div className="p-6 flex items-center gap-3 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl blur-md opacity-50"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Car className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="relative">
              <h1 className="text-lg font-bold gradient-text">AutoParts Pro</h1>
              <p className="text-xs text-slate-500">Sistema de Ventas</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto text-white/50 hover:text-white transition-colors relative">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 space-y-1 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent pointer-events-none"></div>
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative group ${
                  currentPage === item.id
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Active background */}
                {currentPage === item.id && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-10 rounded-xl`}></div>
                )}
                {/* Hover background */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-xl transition-all duration-300"></div>
                
                {/* Active indicator */}
                {currentPage === item.id && (
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b ${item.gradient} rounded-r-full`}></div>
                )}
                
                <div className={`relative w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  currentPage === item.id 
                    ? `bg-gradient-to-br ${item.gradient} shadow-lg` 
                    : 'bg-white/5 group-hover:bg-white/10'
                }`}>
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <span className="relative">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-white/5">
            <div className="glass rounded-xl p-3 flex items-center gap-3">
              <div className="relative">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold bg-gradient-to-br ${
                  user?.role === 'admin' ? 'from-red-500 to-orange-500' :
                  user?.role === 'seller' ? 'from-blue-500 to-cyan-500' :
                  'from-emerald-500 to-teal-500'
                }`}>
                  {user?.name.charAt(0)}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                <p className="text-xs text-slate-500 capitalize">
                  {user?.role === 'admin' ? 'Administrador' : user?.role === 'seller' ? 'Vendedor' : 'Cliente'}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 mt-2 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition-all duration-300"
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 glass-strong border-b border-white/5 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-all"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-lg font-bold text-white">
                  {navItems.find(i => i.id === currentPage)?.label || 'Dashboard'}
                </h2>
                <p className="text-xs text-slate-500 hidden sm:flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Bienvenido de vuelta, {user?.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2.5 rounded-xl glass hover:bg-white/10 text-slate-400 hover:text-white transition-all duration-300 group">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl glass hover:bg-white/10 transition-all duration-300"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold bg-gradient-to-br ${
                    user?.role === 'admin' ? 'from-red-500 to-orange-500' :
                    user?.role === 'seller' ? 'from-blue-500 to-cyan-500' :
                    'from-emerald-500 to-teal-500'
                  }`}>
                    {user?.name.charAt(0)}
                  </div>
                  <span className="text-sm text-white font-medium hidden sm:block">{user?.name.split(' ')[0]}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-52 glass-card rounded-xl py-2 z-50 animate-slide-up shadow-2xl">
                      <button onClick={() => { onNavigate('profile'); setProfileOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-all">
                        <UserIcon className="w-4 h-4" /> Mi Perfil
                      </button>
                      {user?.role === 'admin' && (
                        <button onClick={() => { onNavigate('settings'); setProfileOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-all">
                          <Settings className="w-4 h-4" /> Configuración
                        </button>
                      )}
                      <hr className="my-1 border-white/5" />
                      <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/5 transition-all">
                        <LogOut className="w-4 h-4" /> Cerrar Sesión
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
