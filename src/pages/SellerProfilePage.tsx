import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { sellerProfiles } from '../data/mockData';
import { MapPin, Phone, Clock, Star, Package, Edit, Save, DollarSign, CreditCard, Award, TrendingUp } from 'lucide-react';

export default function SellerProfilePage() {
  const { user } = useAuth();
  const sellerProfile = sellerProfiles.find(s => s.userId === user?.id) || sellerProfiles[0];
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    businessName: sellerProfile.businessName,
    description: sellerProfile.description,
    address: sellerProfile.location.address,
    city: sellerProfile.location.city,
    phone: sellerProfile.phone,
    schedule: sellerProfile.schedule,
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-teal-600/15 to-cyan-600/20"></div>
        <div className="relative p-6 lg:p-8 border border-emerald-500/10 rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl blur-xl opacity-50"></div>
                <div className="relative w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-2xl shadow-emerald-500/30">
                  {sellerProfile.businessName.charAt(0)}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{sellerProfile.businessName}</h2>
                <p className="text-sm text-slate-400 flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4 text-blue-400" /> {sellerProfile.location.city}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                isEditing
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                  : 'glass text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              {isEditing ? <><Save className="w-4 h-4" /> Guardar</> : <><Edit className="w-4 h-4" /> Editar</>}
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Star, value: sellerProfile.rating, label: 'Calificación', gradient: 'from-amber-500 to-orange-500', color: 'text-amber-400' },
          { icon: Package, value: sellerProfile.totalSales, label: 'Ventas', gradient: 'from-blue-500 to-indigo-500', color: 'text-blue-400' },
          { icon: Award, value: sellerProfile.subscriptionActive ? 'Activa' : 'Inactiva', label: 'Suscripción', gradient: 'from-emerald-500 to-teal-500', color: 'text-emerald-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-card rounded-xl p-4 text-center card-hover">
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg mx-auto mb-3`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Profile form */}
      <div className="glass-card rounded-2xl p-6 card-hover relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-bl-full"></div>
        <div className="relative">
          <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <Edit className="w-5 h-5 text-blue-400" />
            Información del Negocio
          </h3>
          
          <div className="space-y-5">
            <div>
              <label className="text-xs text-slate-400 mb-2 block font-medium uppercase tracking-wider">Nombre del negocio</label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                disabled={!isEditing}
                className="w-full px-4 py-3 glass rounded-xl text-white focus:border-blue-400/50 transition-all disabled:opacity-60"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-2 block font-medium uppercase tracking-wider">Descripción</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                disabled={!isEditing}
                rows={3}
                className="w-full px-4 py-3 glass rounded-xl text-white focus:border-blue-400/50 transition-all disabled:opacity-60 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 mb-2 block font-medium uppercase tracking-wider">Dirección</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 glass rounded-xl text-white focus:border-blue-400/50 transition-all disabled:opacity-60"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-2 block font-medium uppercase tracking-wider">Ciudad</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 glass rounded-xl text-white focus:border-blue-400/50 transition-all disabled:opacity-60"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 mb-2 block font-medium uppercase tracking-wider">Teléfono</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 glass rounded-xl text-white focus:border-blue-400/50 transition-all disabled:opacity-60"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-2 block font-medium uppercase tracking-wider">Horario</label>
                <input
                  type="text"
                  value={formData.schedule}
                  onChange={(e) => setFormData({...formData, schedule: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 glass rounded-xl text-white focus:border-blue-400/50 transition-all disabled:opacity-60"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription info */}
      <div className="glass-card rounded-2xl p-6 card-hover relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-bl-full"></div>
        <div className="relative">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-400" />
            Mi Suscripción
          </h3>
          <div className="flex items-center justify-between p-4 glass rounded-xl">
            <div>
              <p className="text-sm font-semibold text-white">
                {sellerProfile.subscriptionType === 'monthly' ? '💎 Plan Mensual' : '⭐ Plan Aprobado por Admin'}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {sellerProfile.subscriptionType === 'monthly' 
                  ? 'RD$1,500/mes - Renovación automática' 
                  : 'Aprobación directa de la administración'}
              </p>
            </div>
            <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
              sellerProfile.subscriptionActive 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                : 'bg-red-500/10 text-red-400 border-red-500/30'
            }`}>
              {sellerProfile.subscriptionActive ? '✓ Activa' : '✗ Inactiva'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
