import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Car, LayoutDashboard, Package, ShoppingCart, Users, MessageSquare, Settings, LogOut, Menu, X, Bell, User as UserIcon, ChevronDown, Heart } from 'lucide-react';

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
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ];

    if (user?.role === 'admin') {
      return [
        ...baseItems,
        { id: 'users', label: 'Usuarios', icon: Users },
        { id: 'sellers', label: 'Vendedores', icon: UserIcon },
        { id: 'orders', label: 'Pedidos', icon: ShoppingCart },
        { id: 'chat', label: 'Mensajes AI', icon: MessageSquare },
        { id: 'settings', label: 'Configuración', icon: Settings },
      ];
    }

    if (user?.role === 'seller') {
      return [
        ...baseItems,
        { id: 'products', label: 'Mis Productos', icon: Package },
        { id: 'orders', label: 'Pedidos', icon: ShoppingCart },
        { id: 'profile', label: 'Mi Perfil', icon: UserIcon },
        { id: 'chat', label: 'Mensajes AI', icon: MessageSquare },
      ];
    }

    // Client
    return [
      ...baseItems,
      { id: 'catalog', label: 'Venta de Partes', icon: Package },
      { id: 'orders', label: 'Mis Pedidos', icon: ShoppingCart },
      { id: 'favorites', label: 'Favoritos', icon: Heart },
      { id: 'chat', label: 'Asistente AI', icon: MessageSquare },
    ];
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-900/95 backdrop-blur-xl border-r border-white/5 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Car className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">AutoParts Pro</h1>
              <p className="text-xs text-blue-300/60">Sistema de Ventas</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto text-white/50 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  currentPage === item.id
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                {user?.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                <p className="text-xs text-slate-400 capitalize">
                  {user?.role === 'admin' ? 'Administrador' : user?.role === 'seller' ? 'Vendedor' : 'Cliente'}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 mt-2 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition-all"
            >
              <LogOut className="w-5 h-5" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-white/70 hover:text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {navItems.find(i => i.id === currentPage)?.label || 'Dashboard'}
                </h2>
                <p className="text-xs text-slate-400 hidden sm:block">
                  Bienvenido de vuelta, {user?.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                    {user?.name.charAt(0)}
                  </div>
                  <span className="text-sm text-white hidden sm:block">{user?.name.split(' ')[0]}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-slate-800 border border-white/10 rounded-xl shadow-xl py-2 z-50">
                      <button onClick={() => { onNavigate('profile'); setProfileOpen(false); }} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white">
                        <UserIcon className="w-4 h-4" /> Mi Perfil
                      </button>
                      {user?.role === 'admin' && (
                        <button onClick={() => { onNavigate('settings'); setProfileOpen(false); }} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white">
                          <Settings className="w-4 h-4" /> Configuración
                        </button>
                      )}
                      <hr className="my-1 border-white/10" />
                      <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/5">
                        <LogOut className="w-4 h-4" /> Salir
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
