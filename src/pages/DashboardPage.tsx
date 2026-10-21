import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, ShoppingCart, Users, DollarSign, Star, MapPin, ArrowUpRight, MessageSquare } from 'lucide-react';
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
      <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/20 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white">¡Bienvenido, Administrador!</h2>
        <p className="text-blue-200/70 mt-1">Aquí tienes un resumen del sistema.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Usuarios Totales" value="156" change="+12%" positive />
        <StatCard icon={Package} label="Productos" value={products.length.toString()} change="+5" positive />
        <StatCard icon={ShoppingCart} label="Pedidos" value={orders.length.toString()} change="+8%" positive />
        <StatCard icon={DollarSign} label="Ingresos" value={`RD$${totalRevenue.toLocaleString()}`} change="+23%" positive />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Vendedores Activos</h3>
          <div className="space-y-3">
            {sellerProfiles.map((seller) => (
              <div key={seller.userId} className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {seller.businessName.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{seller.businessName}</p>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {seller.location.city}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{seller.totalSales} ventas</p>
                  <p className="text-xs text-green-400 flex items-center gap-1 justify-end">
                    <Star className="w-3 h-3" /> {seller.rating}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Pedidos Recientes</h3>
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  order.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{order.id}</p>
                  <p className="text-xs text-slate-400">{order.products.length} productos</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">RD${order.total.toLocaleString()}</p>
                  <p className={`text-xs capitalize ${
                    order.status === 'confirmed' ? 'text-green-400' : 'text-yellow-400'
                  }`}>{order.status === 'confirmed' ? 'Confirmado' : 'Pendiente'}</p>
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
      <div className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-500/20 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white">¡Bienvenido, Vendedor!</h2>
        <p className="text-emerald-200/70 mt-1">Gestiona tus productos y pedidos aquí.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Package} label="Mis Productos" value={myProducts.length.toString()} change="+2" positive />
        <StatCard icon={ShoppingCart} label="Pedidos" value={myOrders.length.toString()} change="+3" positive />
        <StatCard icon={DollarSign} label="Ingresos" value={`RD$${revenue.toLocaleString()}`} change="+15%" positive />
        <StatCard icon={Star} label="Calificación" value="4.8" change="+0.2" positive />
      </div>

      <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Productos Recientes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myProducts.slice(0, 4).map((product) => (
            <div key={product.id} className="flex gap-4 p-4 bg-white/5 rounded-xl">
              <div className="w-16 h-16 bg-slate-700 rounded-lg overflow-hidden flex-shrink-0">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{product.name}</p>
                <p className="text-xs text-slate-400 mt-1">Stock: {product.stock} unidades</p>
                <p className="text-sm font-bold text-blue-400 mt-1">RD${product.price.toLocaleString()}</p>
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
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/20 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white">¡Hola, Carlos!</h2>
        <p className="text-purple-200/70 mt-1">Encuentra las mejores partes para tu vehículo.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={ShoppingCart} label="Mis Pedidos" value={myOrders.length.toString()} change="" positive />
        <StatCard icon={Package} label="Productos Disponibles" value={products.length.toString()} change="+5 hoy" positive />
        <StatCard icon={Star} label="Favoritos" value="3" change="" positive />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <button className="group p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-2xl hover:border-blue-500/40 transition-all text-left">
          <Package className="w-8 h-8 text-blue-400 mb-3" />
          <h3 className="text-white font-semibold">Explorar Catálogo</h3>
          <p className="text-sm text-slate-400 mt-1">Ver todas las partes disponibles</p>
        </button>
        <button className="group p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 rounded-2xl hover:border-emerald-500/40 transition-all text-left">
          <ShoppingCart className="w-8 h-8 text-emerald-400 mb-3" />
          <h3 className="text-white font-semibold">Mis Pedidos</h3>
          <p className="text-sm text-slate-400 mt-1">Seguimiento de tus compras</p>
        </button>
        <button className="group p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-2xl hover:border-purple-500/40 transition-all text-left">
          <MessageSquare className="w-8 h-8 text-purple-400 mb-3" />
          <h3 className="text-white font-semibold">Mensajes</h3>
          <p className="text-sm text-slate-400 mt-1">Contactar vendedores</p>
        </button>
      </div>

      <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Pedidos Recientes</h3>
        <div className="space-y-3">
          {myOrders.map((order) => (
            <div key={order.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                order.status === 'confirmed' ? 'bg-green-500/20' : 'bg-yellow-500/20'
              }`}>
                <ShoppingCart className={`w-5 h-5 ${
                  order.status === 'confirmed' ? 'text-green-400' : 'text-yellow-400'
                }`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{order.id}</p>
                <p className="text-xs text-slate-400">{order.products.map(p => p.productName).join(', ').slice(0, 50)}...</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white">RD${order.total.toLocaleString()}</p>
                <p className={`text-xs capitalize ${
                  order.status === 'confirmed' ? 'text-green-400' : 'text-yellow-400'
                }`}>{order.status === 'confirmed' ? 'Confirmado' : 'Pendiente'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, change, positive }: {
  icon: any; label: string; value: string; change: string; positive: boolean;
}) {
  return (
    <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
        {change && (
          <span className="text-xs font-medium flex items-center gap-0.5 text-green-400">
            <ArrowUpRight className="w-3 h-3" />
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-slate-400 mt-1">{label}</p>
    </div>
  );
}
