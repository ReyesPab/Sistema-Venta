import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { sellerProfiles } from '../data/mockData';
import { MapPin, Phone, Clock, Star, Package, Edit, Save, Camera, DollarSign, CreditCard } from 'lucide-react';

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
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-500/20 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
              {sellerProfile.businessName.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{sellerProfile.businessName}</h2>
              <p className="text-sm text-emerald-200/70 flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {sellerProfile.location.city}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              isEditing
                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white'
            }`}
          >
            {isEditing ? <><Save className="w-4 h-4" /> Guardar</> : <><Edit className="w-4 h-4" /> Editar</>}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-900/50 border border-white/5 rounded-xl p-4 text-center">
          <Star className="w-6 h-6 text-amber-400 mx-auto mb-2" />
          <p className="text-xl font-bold text-white">{sellerProfile.rating}</p>
          <p className="text-xs text-slate-400">Calificación</p>
        </div>
        <div className="bg-slate-900/50 border border-white/5 rounded-xl p-4 text-center">
          <Package className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <p className="text-xl font-bold text-white">{sellerProfile.totalSales}</p>
          <p className="text-xs text-slate-400">Ventas</p>
        </div>
        <div className="bg-slate-900/50 border border-white/5 rounded-xl p-4 text-center">
          <DollarSign className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
          <p className="text-xl font-bold text-white">{sellerProfile.subscriptionType === 'monthly' ? 'Activa' : 'Aprobada'}</p>
          <p className="text-xs text-slate-400">Suscripción</p>
        </div>
      </div>

      {/* Profile form */}
      <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 space-y-6">
        <h3 className="text-lg font-semibold text-white">Información del Negocio</h3>
        
        <div>
          <label className="text-sm text-slate-400 mb-1 block">Nombre del negocio</label>
          <input
            type="text"
            value={formData.businessName}
            onChange={(e) => setFormData({...formData, businessName: e.target.value})}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-400/50 disabled:opacity-60"
          />
        </div>

        <div>
          <label className="text-sm text-slate-400 mb-1 block">Descripción</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            disabled={!isEditing}
            rows={3}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-400/50 disabled:opacity-60 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Dirección</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              disabled={!isEditing}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-400/50 disabled:opacity-60"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Ciudad</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              disabled={!isEditing}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-400/50 disabled:opacity-60"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Teléfono</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              disabled={!isEditing}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-400/50 disabled:opacity-60"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Horario</label>
            <input
              type="text"
              value={formData.schedule}
              onChange={(e) => setFormData({...formData, schedule: e.target.value})}
              disabled={!isEditing}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-400/50 disabled:opacity-60"
            />
          </div>
        </div>
      </div>

      {/* Subscription info */}
      <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Mi Suscripción</h3>
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
          <div>
            <p className="text-sm font-medium text-white">
              {sellerProfile.subscriptionType === 'monthly' ? 'Plan Mensual' : 'Plan Aprobado por Admin'}
            </p>
            <p className="text-xs text-slate-400">
              {sellerProfile.subscriptionType === 'monthly' 
                ? 'RD$1,500/mes - Renovación automática' 
                : 'Aprobación directa de la administración'}
            </p>
          </div>
          <span className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
            sellerProfile.subscriptionActive 
              ? 'bg-green-500/10 text-green-400' 
              : 'bg-red-500/10 text-red-400'
          }`}>
            {sellerProfile.subscriptionActive ? 'Activa' : 'Inactiva'}
          </span>
        </div>
      </div>
    </div>
  );
}
