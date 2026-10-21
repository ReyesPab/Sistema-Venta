import React, { useState } from 'react';
import { SystemConfig } from '../types';
import { Shield, Mail, Phone, DollarSign, Package, Wifi, Bell, Save, Check } from 'lucide-react';

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
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Configuración del Sistema</h2>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
            saved
              ? 'bg-green-500/10 text-green-400 border border-green-500/20'
              : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/30'
          }`}
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Guardado' : 'Guardar Cambios'}
        </button>
      </div>

      {/* Verification */}
      <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Verificación de Seguridad</h3>
            <p className="text-xs text-slate-400">Método de verificación para inicio de sesión</p>
          </div>
        </div>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-all">
            <input
              type="radio"
              name="verification"
              value="email"
              checked={config.verificationMethod === 'email'}
              onChange={() => setConfig({...config, verificationMethod: 'email'})}
              className="w-4 h-4 text-blue-500"
            />
            <Mail className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-sm font-medium text-white">Verificación por correo electrónico</p>
              <p className="text-xs text-slate-400">Se envía un código al email del usuario</p>
            </div>
          </label>
          <label className="flex items-center gap-3 p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-all">
            <input
              type="radio"
              name="verification"
              value="phone"
              checked={config.verificationMethod === 'phone'}
              onChange={() => setConfig({...config, verificationMethod: 'phone'})}
              className="w-4 h-4 text-blue-500"
            />
            <Phone className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-sm font-medium text-white">Verificación por SMS</p>
              <p className="text-xs text-slate-400">Se envía un código al teléfono del usuario</p>
            </div>
          </label>
          <label className="flex items-center gap-3 p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-all">
            <input
              type="radio"
              name="verification"
              value="both"
              checked={config.verificationMethod === 'both'}
              onChange={() => setConfig({...config, verificationMethod: 'both'})}
              className="w-4 h-4 text-blue-500"
            />
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-400" />
              <Phone className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Ambos métodos</p>
              <p className="text-xs text-slate-400">El usuario elige entre email o SMS</p>
            </div>
          </label>
        </div>
      </div>

      {/* Subscription */}
      <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Suscripción de Vendedores</h3>
            <p className="text-xs text-slate-400">Precio de la mensualidad para vendedores</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Precio mensual (RD$)</label>
            <input
              type="number"
              value={config.monthlySubscriptionPrice}
              onChange={(e) => setConfig({...config, monthlySubscriptionPrice: Number(e.target.value)})}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-400/50"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Máximo de productos por vendedor</label>
            <input
              type="number"
              value={config.maxProducts}
              onChange={(e) => setConfig({...config, maxProducts: Number(e.target.value)})}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-400/50"
            />
          </div>
        </div>
      </div>

      {/* System */}
      <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
            <Wifi className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Sistema General</h3>
            <p className="text-xs text-slate-400">Configuraciones generales del sistema</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-sm font-medium text-white">Modo mantenimiento</p>
                <p className="text-xs text-slate-400">Desactiva el acceso para usuarios no-admin</p>
              </div>
            </div>
            <button
              onClick={() => setConfig({...config, maintenanceMode: !config.maintenanceMode})}
              className={`w-12 h-6 rounded-full transition-all ${
                config.maintenanceMode ? 'bg-red-500' : 'bg-slate-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                config.maintenanceMode ? 'translate-x-6' : 'translate-x-0.5'
              }`}></div>
            </button>
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Moneda del sistema</label>
            <select
              value={config.currency}
              onChange={(e) => setConfig({...config, currency: e.target.value})}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-400/50"
            >
              <option value="DOP">Peso Dominicano (RD$)</option>
              <option value="USD">Dólar Americano (US$)</option>
              <option value="EUR">Euro (€)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
