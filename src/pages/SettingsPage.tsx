import React, { useState } from 'react';
import { SystemConfig } from '../types';
import { Shield, Mail, Phone, DollarSign, Wifi, Bell, Save, Check, Zap, Globe, Lock } from 'lucide-react';

export default function SettingsPage() {
  const [config, setConfig] = useState<SystemConfig>({
    verificationMethod: 'both',
    currency: 'DOP',
    monthlySubscriptionPrice: 1500,
    maxProducts: 50,
    maintenanceMode: false
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Zap className="w-6 h-6 text-amber-400" />
            Configuración del Sistema
          </h2>
          <p className="text-sm text-slate-500 mt-1">Administra las opciones globales de la plataforma</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
            saved
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
              : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105'
          }`}
        >
          {saved ? <><Check className="w-4 h-4" /> Guardado</> : <><Save className="w-4 h-4" /> Guardar</>}
        </button>
      </div>

      {/* Verification */}
      <div className="glass-card rounded-2xl p-6 card-hover relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-bl-full"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold">Verificación de Seguridad</h3>
              <p className="text-xs text-slate-500">Método de verificación para inicio de sesión</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { value: 'email', icon: Mail, color: 'from-blue-500 to-cyan-500', title: 'Verificación por correo', desc: 'Se envía un código al email' },
              { value: 'phone', icon: Phone, color: 'from-emerald-500 to-teal-500', title: 'Verificación por SMS', desc: 'Se envía un código al teléfono' },
              { value: 'both', icon: Lock, color: 'from-purple-500 to-pink-500', title: 'Ambos métodos', desc: 'El usuario elige entre email o SMS' },
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-4 p-4 glass rounded-xl cursor-pointer hover:bg-white/[0.03] transition-all duration-300 group">
                <input
                  type="radio"
                  name="verification"
                  value={option.value}
                  checked={config.verificationMethod === option.value}
                  onChange={() => setConfig({...config, verificationMethod: option.value as any})}
                  className="sr-only"
                />
                <div className={`w-10 h-10 bg-gradient-to-br ${option.color} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ${
                  config.verificationMethod === option.value ? 'ring-2 ring-white/20' : ''
                }`}>
                  <option.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{option.title}</p>
                  <p className="text-xs text-slate-500">{option.desc}</p>
                </div>
                {config.verificationMethod === option.value && (
                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Subscription */}
      <div className="glass-card rounded-2xl p-6 card-hover relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/5 to-transparent rounded-bl-full"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold">Suscripción de Vendedores</h3>
              <p className="text-xs text-slate-500">Precio de la mensualidad para vendedores</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 mb-2 block font-medium uppercase tracking-wider">Precio mensual (RD$)</label>
              <input
                type="number"
                value={config.monthlySubscriptionPrice}
                onChange={(e) => setConfig({...config, monthlySubscriptionPrice: Number(e.target.value)})}
                className="w-full px-4 py-3 glass rounded-xl text-white focus:border-amber-400/50 transition-all"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-2 block font-medium uppercase tracking-wider">Máx. productos por vendedor</label>
              <input
                type="number"
                value={config.maxProducts}
                onChange={(e) => setConfig({...config, maxProducts: Number(e.target.value)})}
                className="w-full px-4 py-3 glass rounded-xl text-white focus:border-amber-400/50 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* System */}
      <div className="glass-card rounded-2xl p-6 card-hover relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/5 to-transparent rounded-bl-full"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold">Sistema General</h3>
              <p className="text-xs text-slate-500">Configuraciones generales del sistema</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 glass rounded-xl hover:bg-white/[0.03] transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Modo mantenimiento</p>
                  <p className="text-xs text-slate-500">Desactiva el acceso para usuarios no-admin</p>
                </div>
              </div>
              <button
                onClick={() => setConfig({...config, maintenanceMode: !config.maintenanceMode})}
                className={`w-14 h-7 rounded-full transition-all duration-300 relative ${
                  config.maintenanceMode 
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 shadow-lg shadow-red-500/30' 
                    : 'bg-white/10'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all duration-300 shadow-md ${
                  config.maintenanceMode ? 'translate-x-8' : 'translate-x-1'
                }`}></div>
              </button>
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-2 block font-medium uppercase tracking-wider">Moneda del sistema</label>
              <select
                value={config.currency}
                onChange={(e) => setConfig({...config, currency: e.target.value})}
                className="w-full px-4 py-3 glass rounded-xl text-white focus:border-purple-400/50 transition-all"
              >
                <option value="DOP" className="bg-slate-900">Peso Dominicano (RD$)</option>
                <option value="USD" className="bg-slate-900">Dólar Americano (US$)</option>
                <option value="EUR" className="bg-slate-900">Euro (€)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
