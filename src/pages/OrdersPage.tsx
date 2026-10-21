import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { orders } from '../data/mockData';
import { Package, Truck, MapPin, CreditCard, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';

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
      case 'confirmed': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'shipped': return <Truck className="w-5 h-5 text-blue-400" />;
      case 'delivered': return <Package className="w-5 h-5 text-emerald-400" />;
      case 'cancelled': return <XCircle className="w-5 h-5 text-red-400" />;
      default: return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'confirmed': return 'Confirmado';
      case 'shipped': return 'Enviado';
      case 'delivered': return 'Entregado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'confirmed': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'shipped': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'delivered': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">
          {user?.role === 'admin' ? 'Todos los Pedidos' : user?.role === 'seller' ? 'Pedidos Recibidos' : 'Mis Pedidos'}
        </h2>
        <span className="text-sm text-slate-400">{myOrders.length} pedidos</span>
      </div>

      <div className="space-y-4">
        {myOrders.map((order) => (
          <div key={order.id} className="bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                </div>
                <div>
                  <p className="text-white font-semibold">{order.id}</p>
                  <p className="text-xs text-slate-400">{order.createdAt}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${getStatusColor(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
                <p className="text-lg font-bold text-white">RD${order.total.toLocaleString()}</p>
              </div>
            </div>

            {/* Products */}
            <div className="px-5 pb-4 space-y-2">
              {order.products.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <div>
                    <p className="text-sm text-white">{item.productName}</p>
                    <p className="text-xs text-slate-400">Cantidad: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-blue-400">RD${(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>

            {/* Details */}
            <div className="px-5 pb-5">
              <div className="flex flex-wrap gap-4 p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <CreditCard className="w-4 h-4" />
                  <span>{order.paymentMethod}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  {order.deliveryMethod === 'shipping' ? (
                    <>
                      <Truck className="w-4 h-4" />
                      <span>Envío a domicilio</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="w-4 h-4" />
                      <span>Recoger en tienda</span>
                    </>
                  )}
                </div>
                {order.shippingAddress && (
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <MapPin className="w-4 h-4" />
                    <span>{order.shippingAddress}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {myOrders.length === 0 && (
        <div className="text-center py-16">
          <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white">No hay pedidos</h3>
          <p className="text-slate-400 mt-1">Los pedidos aparecerán aquí cuando realices compras.</p>
        </div>
      )}
    </div>
  );
}
