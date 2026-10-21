import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { orders } from '../data/mockData';
import { Package, Truck, MapPin, CreditCard, Clock, CheckCircle, XCircle, ShoppingBag, ArrowUpRight } from 'lucide-react';

export default function OrdersPage() {
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const myOrders = user?.role === 'admin' 
    ? orders 
    : user?.role === 'seller' 
      ? orders.filter(o => o.sellerId === user.id)
      : orders.filter(o => o.clientId === user?.id);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'confirmed': return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'shipped': return <Truck className="w-5 h-5 text-blue-400" />;
      case 'delivered': return <Package className="w-5 h-5 text-emerald-400" />;
      case 'cancelled': return <XCircle className="w-5 h-5 text-red-400" />;
      default: return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return '⏳ Pendiente';
      case 'confirmed': return '✅ Confirmado';
      case 'shipped': return '🚚 Enviado';
      case 'delivered': return '📦 Entregado';
      case 'cancelled': return '❌ Cancelado';
      default: return status;
    }
  };

  const getStatusGradient = (status: string) => {
    switch (status) {
      case 'pending': return 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30 text-yellow-400';
      case 'confirmed': return 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400';
      case 'shipped': return 'from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-400';
      case 'delivered': return 'from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-400';
      case 'cancelled': return 'from-red-500/20 to-rose-500/20 border-red-500/30 text-red-400';
      default: return 'from-slate-500/20 to-gray-500/20 border-slate-500/30 text-slate-400';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-blue-400" />
            {user?.role === 'admin' ? 'Todos los Pedidos' : user?.role === 'seller' ? 'Pedidos Recibidos' : 'Mis Pedidos'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">{myOrders.length} pedidos en total</p>
        </div>
      </div>

      <div className="space-y-4">
        {myOrders.map((order, index) => (
          <div 
            key={order.id} 
            className="glass-card rounded-2xl overflow-hidden card-hover animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${getStatusGradient(order.status)} border`}>
                  {getStatusIcon(order.status)}
                </div>
                <div>
                  <p className="text-white font-bold text-lg">{order.id}</p>
                  <p className="text-xs text-slate-500">{order.createdAt}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border bg-gradient-to-r ${getStatusGradient(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
                <p className="text-xl font-bold gradient-text-blue">RD${order.total.toLocaleString()}</p>
              </div>
            </div>

            {/* Products */}
            <div className="px-5 pb-4 space-y-2">
              {order.products.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 glass rounded-xl hover:bg-white/[0.03] transition-all">
                  <div>
                    <p className="text-sm font-medium text-white">{item.productName}</p>
                    <p className="text-xs text-slate-500">Cantidad: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold gradient-text">RD${(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>

            {/* Details */}
            <div className="px-5 pb-5">
              <div className="flex flex-wrap gap-3 p-4 glass rounded-xl">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <CreditCard className="w-4 h-4 text-blue-400" />
                  <span>{order.paymentMethod}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  {order.deliveryMethod === 'shipping' ? (
                    <>
                      <Truck className="w-4 h-4 text-emerald-400" />
                      <span>Envío a domicilio</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="w-4 h-4 text-purple-400" />
                      <span>Recoger en tienda</span>
                    </>
                  )}
                </div>
                {order.shippingAddress && (
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <MapPin className="w-4 h-4 text-rose-400" />
                    <span className="truncate max-w-[200px]">{order.shippingAddress}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {myOrders.length === 0 && (
        <div className="text-center py-20">
          <div className="w-20 h-20 glass rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Package className="w-10 h-10 text-slate-600" />
          </div>
          <h3 className="text-lg font-semibold text-white">No hay pedidos</h3>
          <p className="text-slate-500 mt-1">Los pedidos aparecerán aquí cuando realices compras.</p>
        </div>
      )}
    </div>
  );
}
