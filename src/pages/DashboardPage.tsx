import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, ShoppingCart, Users, DollarSign, Star, MapPin, ArrowUpRight, MessageSquare, TrendingUp, Zap, Award } from 'lucide-react';
import { products, orders, sellerProfiles } from '../data/mockData';

export default function DashboardPage() {
  const { user } = useAuth();

  if (user?.role === 'admin') return <AdminDashboard />;
  if (user?.role === 'seller') return <SellerDashboard userId={user.id} />;
  return <ClientDashboard userId={user?.id || '3'} />;
}

function AdminDashboard() {
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  
  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-indigo-600/20 to-purple-600/30"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>
        <div className="relative p-6 lg:p-8 border border-white/10 rounded-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-medium text-blue-300 uppercase tracking-wider">Panel de Control</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white">¡Bienvenido, Administrador!</h2>
              <p className="text-slate-400 mt-1">Aquí tienes un resumen completo del sistema.</p>
            </div>
            <div className="flex gap-3">
              <div className="glass rounded-xl px-4 py-3 text-center">
                <p className="text-2xl font-bold gradient-text">{sellerProfiles.length}</p>
                <p className="text-xs text-slate-400">Tiendas</p>
              </div>
              <div className="glass rounded-xl px-4 py-3 text-center">
                <p className="text-2xl font-bold gradient-text-blue">{products.length}</p>
                <p className="text-xs text-slate-400">Productos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Usuarios Totales" value="156" change="+12%" gradient="from-blue-500 to-cyan-500" />
        <StatCard icon={Package} label="Productos" value={products.length.toString()} change="+5" gradient="from-purple-500 to-pink-500" />
        <StatCard icon={ShoppingCart} label="Pedidos" value={orders.length.toString()} change="+8%" gradient="from-amber-500 to-orange-500" />
        <StatCard icon={DollarSign} label="Ingresos" value={`RD$${totalRevenue.toLocaleString()}`} change="+23%" gradient="from-emerald-500 to-teal-500" />
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6 card-hover">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Vendedores Top
            </h3>
            <span className="text-xs text-slate-500 glass px-2 py-1 rounded-lg">Activos</span>
          </div>
          <div className="space-y-3">
            {sellerProfiles.map((seller, i) => (
              <div key={seller.userId} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group" style={{animationDelay: `${i * 100}ms`}}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br ${
                  i === 0 ? 'from-amber-400 to-orange-500' : 'from-emerald-400 to-teal-500'
                } shadow-lg group-hover:scale-110 transition-transform`}>
                  {seller.businessName.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{seller.businessName}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {seller.location.city}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">{seller.totalSales}</p>
                  <p className="text-xs text-amber-400 flex items-center gap-0.5 justify-end">
                    <Star className="w-3 h-3 fill-amber-400" /> {seller.rating}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 card-hover">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Pedidos Recientes
            </h3>
            <span className="text-xs text-slate-500 glass px-2 py-1 rounded-lg">Últimos 7 días</span>
          </div>
          <div className="space-y-3">
            {orders.map((order, i) => (
              <div key={order.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-300" style={{animationDelay: `${i * 100}ms`}}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  order.status === 'confirmed' 
                    ? 'bg-gradient-to-br from-green-400/20 to-emerald-500/20 text-green-400' 
                    : 'bg-gradient-to-br from-yellow-400/20 to-amber-500/20 text-yellow-400'
                }`}>
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{order.id}</p>
                  <p className="text-xs text-slate-500">{order.products.length} productos</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">RD${order.total.toLocaleString()}</p>
                  <p className={`text-xs font-medium ${
                    order.status === 'confirmed' ? 'text-green-400' : 'text-yellow-400'
                  }`}>{order.status === 'confirmed' ? '✓ Confirmado' : '⏳ Pendiente'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SellerDashboard({ userId }: { userId: string }) {
  const myProducts = products.filter(p => p.sellerId === userId);
  const myOrders = orders.filter(o => o.sellerId === userId);
  const revenue = myOrders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-teal-600/15 to-cyan-600/20"></div>
        <div className="relative p-6 lg:p-8 border border-emerald-500/10 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
              <Package className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-medium text-emerald-300 uppercase tracking-wider">Panel Vendedor</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white">¡Bienvenido, Vendedor!</h2>
          <p className="text-slate-400 mt-1">Gestiona tus productos y pedidos desde aquí.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Package} label="Mis Productos" value={myProducts.length.toString()} change="+2" gradient="from-emerald-500 to-green-500" />
        <StatCard icon={ShoppingCart} label="Pedidos" value={myOrders.length.toString()} change="+3" gradient="from-blue-500 to-indigo-500" />
        <StatCard icon={DollarSign} label="Ingresos" value={`RD$${revenue.toLocaleString()}`} change="+15%" gradient="from-amber-500 to-orange-500" />
        <StatCard icon={Star} label="Calificación" value="4.8" change="+0.2" gradient="from-purple-500 to-pink-500" />
      </div>

      <div className="glass-card rounded-2xl p-6 card-hover">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-blue-400" />
          Productos Recientes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myProducts.slice(0, 4).map((product) => (
            <div key={product.id} className="flex gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-all duration-300 group">
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 ring-2 ring-white/5 group-hover:ring-blue-500/30 transition-all">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate group-hover:text-blue-300 transition-colors">{product.name}</p>
                <p className="text-xs text-slate-500 mt-1">Stock: {product.stock} unidades</p>
                <p className="text-sm font-bold gradient-text-blue mt-1">RD${product.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClientDashboard({ userId }: { userId: string }) {
  const myOrders = orders.filter(o => o.clientId === userId);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/15 to-rose-600/20"></div>
        <div className="relative p-6 lg:p-8 border border-purple-500/10 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-medium text-purple-300 uppercase tracking-wider">Mi Espacio</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white">¡Hola, Carlos!</h2>
          <p className="text-slate-400 mt-1">Encuentra las mejores partes para tu vehículo.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={ShoppingCart} label="Mis Pedidos" value={myOrders.length.toString()} change="" gradient="from-blue-500 to-indigo-500" />
        <StatCard icon={Package} label="Disponibles" value={products.length.toString()} change="+5 hoy" gradient="from-emerald-500 to-teal-500" />
        <StatCard icon={Star} label="Favoritos" value="3" change="" gradient="from-rose-500 to-pink-500" />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <QuickActionCard 
          icon={Package} 
          title="Explorar Catálogo" 
          description="Ver todas las partes disponibles" 
          gradient="from-blue-500 to-indigo-600"
          glow="blue"
        />
        <QuickActionCard 
          icon={ShoppingCart} 
          title="Mis Pedidos" 
          description="Seguimiento de tus compras" 
          gradient="from-emerald-500 to-teal-600"
          glow="emerald"
        />
        <QuickActionCard 
          icon={MessageSquare} 
          title="Asistente AI" 
          description="Pregúntale al chatbot" 
          gradient="from-purple-500 to-pink-600"
          glow="purple"
        />
      </div>

      {/* Recent orders */}
      <div className="glass-card rounded-2xl p-6 card-hover">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          Pedidos Recientes
        </h3>
        <div className="space-y-3">
          {myOrders.map((order) => (
            <div key={order.id} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-300">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                order.status === 'confirmed' 
                  ? 'bg-gradient-to-br from-green-400/20 to-emerald-500/20' 
                  : 'bg-gradient-to-br from-yellow-400/20 to-amber-500/20'
              }`}>
                <ShoppingCart className={`w-5 h-5 ${
                  order.status === 'confirmed' ? 'text-green-400' : 'text-yellow-400'
                }`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{order.id}</p>
                <p className="text-xs text-slate-500 truncate max-w-[200px]">{order.products.map(p => p.productName).join(', ')}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white">RD${order.total.toLocaleString()}</p>
                <p className={`text-xs font-medium ${
                  order.status === 'confirmed' ? 'text-green-400' : 'text-yellow-400'
                }`}>{order.status === 'confirmed' ? '✓ Confirmado' : '⏳ Pendiente'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, change, gradient }: {
  icon: any; label: string; value: string; change: string; gradient: string;
}) {
  return (
    <div className="glass-card rounded-2xl p-5 card-hover relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-5 rounded-full -translate-y-8 translate-x-8 group-hover:opacity-10 transition-opacity`}></div>
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div className={`w-11 h-11 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          {change && (
            <span className="text-xs font-medium flex items-center gap-0.5 text-emerald-400 glass px-2 py-1 rounded-lg">
              <ArrowUpRight className="w-3 h-3" />
              {change}
            </span>
          )}
        </div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm text-slate-500 mt-1">{label}</p>
      </div>
    </div>
  );
}

function QuickActionCard({ icon: Icon, title, description, gradient, glow }: {
  icon: any; title: string; description: string; gradient: string; glow: string;
}) {
  return (
    <button className={`group relative p-6 glass-card rounded-2xl hover:border-white/15 transition-all duration-500 text-left overflow-hidden card-3d`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
      <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-all duration-500`}></div>
      <div className="relative">
        <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-white font-semibold text-lg">{title}</h3>
        <p className="text-sm text-slate-500 mt-1">{description}</p>
      </div>
    </button>
  );
}

import { ShoppingBag } from 'lucide-react';
