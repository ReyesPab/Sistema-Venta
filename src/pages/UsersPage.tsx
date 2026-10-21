import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { Users, Search, Shield, Wrench, ShoppingBag, Check, Ban, UserCheck, UserX } from 'lucide-react';

const mockUsers: User[] = [
  { id: '1', name: 'Admin Principal', email: 'admin@autoparts.com', phone: '+1 809-555-0001', role: 'admin', verified: true, createdAt: '2024-01-01' },
  { id: '2', name: 'AutoParts Santo Domingo', email: 'vendedor@autoparts.com', phone: '+1 809-555-0002', role: 'seller', verified: true, createdAt: '2024-02-15' },
  { id: '3', name: 'Carlos Cliente', email: 'cliente@email.com', phone: '+1 809-555-0003', role: 'client', verified: true, createdAt: '2024-03-01' },
  { id: '4', name: 'Repuestos El Turbo', email: 'tur@email.com', phone: '+1 809-555-0010', role: 'seller', verified: true, createdAt: '2024-03-10' },
  { id: '5', name: 'María García', email: 'maria@email.com', phone: '+1 809-555-0015', role: 'client', verified: false, createdAt: '2024-03-20' },
  { id: '6', name: 'Pedro Auto Parts', email: 'pedro@email.com', phone: '+1 809-555-0020', role: 'seller', verified: false, createdAt: '2024-03-22' },
];

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | UserRole>('all');

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin': return <Shield className="w-4 h-4" />;
      case 'seller': return <Wrench className="w-4 h-4" />;
      case 'client': return <ShoppingBag className="w-4 h-4" />;
    }
  };

  const getRoleGradient = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'from-red-500 to-orange-500';
      case 'seller': return 'from-blue-500 to-cyan-500';
      case 'client': return 'from-emerald-500 to-teal-500';
    }
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'seller': return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'client': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    }
  };

  const toggleVerification = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, verified: !u.verified } : u));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-purple-400" />
          Gestión de Usuarios
        </h2>
        <p className="text-sm text-slate-500 mt-1">Administra todos los usuarios del sistema</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 glass rounded-xl text-white placeholder-slate-500 focus:border-blue-400/50 transition-all"
            />
          </div>
        </div>
        <div className="flex gap-2">
          {([
            { value: 'all', label: 'Todos', icon: Users },
            { value: 'admin', label: 'Admin', icon: Shield },
            { value: 'seller', label: 'Vendedores', icon: Wrench },
            { value: 'client', label: 'Clientes', icon: ShoppingBag },
          ] as const).map(role => (
            <button
              key={role.value}
              onClick={() => setFilterRole(role.value)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                filterRole === role.value
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/10'
                  : 'glass text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              <role.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{role.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: users.length, gradient: 'from-slate-500 to-gray-500', icon: Users },
          { label: 'Admins', value: users.filter(u => u.role === 'admin').length, gradient: 'from-red-500 to-orange-500', icon: Shield },
          { label: 'Vendedores', value: users.filter(u => u.role === 'seller').length, gradient: 'from-blue-500 to-cyan-500', icon: Wrench },
          { label: 'Clientes', value: users.filter(u => u.role === 'client').length, gradient: 'from-emerald-500 to-teal-500', icon: ShoppingBag },
        ].map((stat, i) => (
          <div key={i} className="glass-card rounded-xl p-4 card-hover">
            <div className={`w-10 h-10 bg-gradient-to-br ${stat.gradient} rounded-lg flex items-center justify-center shadow-lg mb-3`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Users list */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Usuario</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:table-cell">Contacto</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Rol</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Estado</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-all animate-slide-up" style={{animationDelay: `${index * 50}ms`}}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${getRoleGradient(user.role)} rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{user.name}</p>
                        <p className="text-xs text-slate-500 sm:hidden">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <p className="text-sm text-white">{user.email}</p>
                    <p className="text-xs text-slate-500">{user.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${getRoleBadge(user.role)}`}>
                      {getRoleIcon(user.role)}
                      {user.role === 'admin' ? 'Admin' : user.role === 'seller' ? 'Vendedor' : 'Cliente'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      user.verified 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {user.verified ? <><UserCheck className="w-3 h-3" /> Verificado</> : <><UserX className="w-3 h-3" /> Pendiente</>}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleVerification(user.id)}
                      className={`p-2.5 rounded-xl transition-all duration-300 ${
                        user.verified
                          ? 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 border border-yellow-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20'
                      }`}
                      title={user.verified ? 'Desverificar' : 'Verificar'}
                    >
                      {user.verified ? <Ban className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
