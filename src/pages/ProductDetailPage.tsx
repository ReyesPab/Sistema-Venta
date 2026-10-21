import React, { useState } from 'react';
import { Product } from '../types';
import { sellerProfiles } from '../data/mockData';
import { ArrowLeft, MapPin, Star, ShoppingCart, Heart, Truck, Store, Shield, Clock, Tag, MessageSquare, Minus, Plus, CreditCard, Banknote, Sparkles, CheckCircle } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetailPage({ product, onBack, onAddToCart }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'shipping'>('shipping');
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderComplete, setOrderComplete] = useState(false);

  const seller = sellerProfiles.find(s => s.userId === product.sellerId);

  const handleBuy = () => {
    onAddToCart(product, quantity);
    setShowCheckout(true);
  };

  const handleConfirmOrder = () => {
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
      <div className="max-w-lg mx-auto text-center py-12 animate-bounce-in">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
          <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/30">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">¡Pedido Confirmado!</h2>
        <p className="text-slate-400 mb-6">Tu pedido ha sido procesado exitosamente.</p>
        <div className="glass-card rounded-xl p-4 mb-6 text-left">
          <p className="text-sm text-slate-400">Número de pedido</p>
          <p className="text-lg font-bold gradient-text">ORD-{Date.now().toString().slice(-6)}</p>
        </div>
        <button onClick={onBack} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all">
          Seguir Comprando
        </button>
      </div>
    );
  }

  if (showCheckout) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-slide-up">
        <button onClick={() => setShowCheckout(false)} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Volver al producto
        </button>

        <div className="glass-card rounded-2xl p-6 lg:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-bl-full"></div>
          
          <div className="relative">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-blue-400" />
              Confirmar Compra
            </h2>

            {/* Product summary */}
            <div className="flex gap-4 p-4 glass rounded-xl mb-6">
              <img src={product.images[0]} alt={product.name} className="w-20 h-20 object-cover rounded-xl ring-2 ring-white/10" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white">{product.name}</h3>
                <p className="text-xs text-slate-500 mt-1">Cantidad: {quantity}</p>
                <p className="text-lg font-bold gradient-text-blue mt-1">RD${(product.price * quantity).toLocaleString()}</p>
              </div>
            </div>

            {/* Delivery method */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-white mb-3">Método de entrega</h4>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setDeliveryMethod('shipping')}
                  className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                    deliveryMethod === 'shipping'
                      ? 'bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-blue-500/30 text-blue-300 shadow-lg shadow-blue-500/10'
                      : 'glass text-slate-400 hover:border-white/20'
                  }`}
                >
                  <Truck className="w-5 h-5 mb-2" />
                  <p className="text-sm font-medium">Envío a domicilio</p>
                  <p className="text-xs mt-1 opacity-70">2-5 días hábiles</p>
                </button>
                <button
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                    deliveryMethod === 'pickup'
                      ? 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/30 text-emerald-300 shadow-lg shadow-emerald-500/10'
                      : 'glass text-slate-400 hover:border-white/20'
                  }`}
                >
                  <Store className="w-5 h-5 mb-2" />
                  <p className="text-sm font-medium">Recoger en tienda</p>
                  <p className="text-xs mt-1 opacity-70">Disponible hoy</p>
                </button>
              </div>
            </div>

            {deliveryMethod === 'shipping' && (
              <div className="mb-6 animate-slide-up">
                <label className="text-sm font-medium text-white mb-2 block">Dirección de envío</label>
                <input
                  type="text"
                  placeholder="Tu dirección completa"
                  className="w-full px-4 py-3 glass rounded-xl text-white placeholder-slate-500 focus:border-blue-400/50 transition-all"
                />
              </div>
            )}

            {/* Payment method */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-white mb-3">Método de pago</h4>
              <div className="space-y-2">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 ${
                    paymentMethod === 'card'
                      ? 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-blue-500/30 text-blue-300 shadow-lg shadow-blue-500/10'
                      : 'glass text-slate-400 hover:border-white/20'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <div className="text-left">
                    <p className="text-sm font-medium">Tarjeta de crédito/débito</p>
                    <p className="text-xs opacity-70">Visa, MasterCard, Atlantic</p>
                  </div>
                </button>
                <button
                  onClick={() => setPaymentMethod('transfer')}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 ${
                    paymentMethod === 'transfer'
                      ? 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/30 text-emerald-300 shadow-lg shadow-emerald-500/10'
                      : 'glass text-slate-400 hover:border-white/20'
                  }`}
                >
                  <Banknote className="w-5 h-5" />
                  <div className="text-left">
                    <p className="text-sm font-medium">Transferencia bancaria</p>
                    <p className="text-xs opacity-70">Pago directo a la cuenta</p>
                  </div>
                </button>
              </div>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-3 mb-6 animate-slide-up">
                <input type="text" placeholder="Número de tarjeta" className="w-full px-4 py-3 glass rounded-xl text-white placeholder-slate-500 focus:border-blue-400/50 transition-all" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="MM/AA" className="px-4 py-3 glass rounded-xl text-white placeholder-slate-500 focus:border-blue-400/50 transition-all" />
                  <input type="text" placeholder="CVV" className="px-4 py-3 glass rounded-xl text-white placeholder-slate-500 focus:border-blue-400/50 transition-all" />
                </div>
              </div>
            )}

            {/* Total */}
            <div className="border-t border-white/5 pt-4 mb-6">
              <div className="flex justify-between text-sm text-slate-400 mb-2">
                <span>Subtotal</span>
                <span>RD${(product.price * quantity).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-400 mb-2">
                <span>Envío</span>
                <span>{deliveryMethod === 'shipping' ? 'RD$350' : 'Gratis'}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-white pt-3 border-t border-white/5">
                <span>Total</span>
                <span className="gradient-text-blue">RD${(product.price * quantity + (deliveryMethod === 'shipping' ? 350 : 0)).toLocaleString()}</span>
              </div>
            </div>

            <button 
              onClick={handleConfirmOrder}
              className="w-full py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <Shield className="w-5 h-5" />
              Confirmar y Pagar
            </button>

            <p className="text-xs text-slate-500 text-center mt-3 flex items-center justify-center gap-1">
              <Shield className="w-3 h-3" /> Pago seguro con encriptación SSL
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Volver al catálogo
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image */}
        <div className="space-y-4">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden glass-card relative group">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30 text-blue-400 text-xs font-semibold rounded-lg">
                {product.category}
              </span>
              <span className="px-3 py-1 glass text-slate-400 text-xs rounded-lg">
                {product.condition === 'new' ? '✨ Nuevo' : product.condition === 'used' ? 'Usado' : 'Reacondicionado'}
              </span>
              {product.forRent && (
                <span className="px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 text-xs font-semibold rounded-lg flex items-center gap-1">
                  <Tag className="w-3 h-3" /> Alquiler
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-white">{product.name}</h1>
            <p className="text-slate-400 mt-3 leading-relaxed">{product.description}</p>
          </div>

          <div className="text-3xl font-bold">
            <span className="gradient-text-blue">RD${product.price.toLocaleString()}</span>
            {product.forRent && (
              <span className="text-sm text-amber-400 font-normal ml-3">
                / Alquiler: RD${product.rentalPrice?.toLocaleString()}/día
              </span>
            )}
          </div>

          {/* Vehicle compatibility */}
          <div>
            <h4 className="text-sm font-medium text-white mb-2">Compatible con:</h4>
            <div className="flex flex-wrap gap-2">
              {product.vehicleCompatibility.map((v, i) => (
                <span key={i} className="px-3 py-1.5 glass border border-white/10 rounded-lg text-sm text-slate-300">
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Seller info */}
          {seller && (
            <div className="glass-card rounded-xl p-4 card-hover">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/20">
                  {seller.businessName.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{seller.businessName}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-blue-400" /> {seller.location.address}, {seller.location.city}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-amber-400 flex items-center gap-1 font-semibold">
                    <Star className="w-4 h-4 fill-amber-400" /> {seller.rating}
                  </p>
                  <p className="text-xs text-slate-500">{seller.totalSales} ventas</p>
                </div>
              </div>
              <div className="flex gap-3 mt-3 pt-3 border-t border-white/5">
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock className="w-3 h-3" /> {seller.schedule}
                </span>
              </div>
            </div>
          )}

          {/* Quantity & Add to cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center glass rounded-xl">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 text-slate-400 hover:text-white transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-5 text-white font-bold text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="p-3 text-slate-400 hover:text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <span className={`text-sm font-medium ${product.stock > 5 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {product.stock} disponibles
            </span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleBuy}
              className="flex-1 py-3.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <ShoppingCart className="w-5 h-5" /> Comprar Ahora
            </button>
            <button className="px-4 py-3.5 glass rounded-xl text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-all duration-300">
              <Heart className="w-5 h-5" />
            </button>
            <button className="px-4 py-3.5 glass rounded-xl text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-300">
              <MessageSquare className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery options */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 glass rounded-xl flex items-center gap-3 card-hover">
              <Truck className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-xs font-medium text-white">Envío a domicilio</p>
                <p className="text-xs text-slate-500">2-5 días</p>
              </div>
            </div>
            <div className="p-3 glass rounded-xl flex items-center gap-3 card-hover">
              <Store className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-xs font-medium text-white">Recoger en tienda</p>
                <p className="text-xs text-slate-500">Hoy disponible</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
