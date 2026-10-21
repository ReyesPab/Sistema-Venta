import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { Users, Search, Shield, Wrench, ShoppingBag, MoreVertical, Check, X, Ban } from 'lucide-react';

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
      case 'admin': return <Shield className="w-4 h-4 text-red-400" />;
      case 'seller': return <Wrench className="w-4 h-4 text-blue-400" />;
      case 'client': return <ShoppingBag className="w-4 h-4 text-emerald-400" />;
    }
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'seller': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'client': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    }
  };

  const toggleVerification = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, verified: !u.verified } : u));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/50"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'admin', 'seller', 'client'] as const).map(role => (
            <button
              key={role}
              onClick={() => setFilterRole(role)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filterRole === role
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  : 'bg-slate-900/50 text-slate-400 border border-white/10 hover:text-white'
              }`}
            >
              {role === 'all' ? 'Todos' : role === 'admin' ? 'Admin' : role === 'seller' ? 'Vendedores' : 'Clientes'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900/50 border border-white/5 rounded-xl p-4">
          <p className="text-2xl font-bold text-white">{users.length}</p>
          <p className="text-sm text-slate-400">Total usuarios</p>
        </div>
        <div className="bg-slate-900/50 border border-white/5 rounded-xl p-4">
          <p className="text-2xl font-bold text-red-400">{users.filter(u => u.role === 'admin').length}</p>
          <p className="text-sm text-slate-400">Administradores</p>
        </div>
        <div className="bg-slate-900/50 border border-white/5 rounded-xl p-4">
          <p className="text-2xl font-bold text-blue-400">{users.filter(u => u.role === 'seller').length}</p>
          <p className="text-sm text-slate-400">Vendedores</p>
        </div>
        <div className="bg-slate-900/50 border border-white/5 rounded-xl p-4">
          <p className="text-2xl font-bold text-emerald-400">{users.filter(u => u.role === 'client').length}</p>
          <p className="text-sm text-slate-400">Clientes</p>
        </div>
      </div>

      {/* Users list */}
      <div className="bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase">Usuario</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase hidden sm:table-cell">Contacto</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase">Rol</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase">Estado</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-xs text-slate-400 sm:hidden">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <p className="text-sm text-white">{user.email}</p>
                    <p className="text-xs text-slate-400">{user.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${getRoleBadge(user.role)}`}>
                      {getRoleIcon(user.role)}
                      {user.role === 'admin' ? 'Admin' : user.role === 'seller' ? 'Vendedor' : 'Cliente'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${
                      user.verified ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {user.verified ? '✓ Verificado' : '⏳ Pendiente'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleVerification(user.id)}
                        className={`p-2 rounded-lg transition-all ${
                          user.verified
                            ? 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20'
                            : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                        }`}
                        title={user.verified ? 'Desverificar' : 'Verificar'}
                      >
                        {user.verified ? <Ban className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                      </button>
                    </div>
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
