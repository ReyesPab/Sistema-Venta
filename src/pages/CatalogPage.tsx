import React, { useState } from 'react';
import { products, sellerProfiles } from '../data/mockData';
import { Search, Filter, MapPin, Star, ShoppingCart, Heart, Eye, Tag, Store, Package, Sparkles, Grid3X3, SlidersHorizontal } from 'lucide-react';
import { Product } from '../types';

interface CatalogPageProps {
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

export default function CatalogPage({ onAddToCart, onViewProduct }: CatalogPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];
  const cities = ['all', ...Array.from(new Set(products.map(p => p.location.city)))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.vehicleCompatibility.some(v => v.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesCity = selectedCity === 'all' || p.location.city === selectedCity;
    return matchesSearch && matchesCategory && matchesCity;
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const getSellerName = (sellerId: string) => {
    const seller = sellerProfiles.find(s => s.userId === sellerId);
    return seller?.businessName || 'Vendedor';
  };

  return (
    <div className="space-y-6">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/15 to-pink-600/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>
        <div className="relative p-6 lg:p-8 border border-indigo-500/10 rounded-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-medium text-indigo-300 uppercase tracking-wider">Catálogo Premium</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white">Venta de Partes</h2>
              <p className="text-slate-400 mt-1">Encuentra las mejores partes para tu vehículo</p>
            </div>
            <div className="flex gap-3">
              <div className="glass rounded-xl px-4 py-3 text-center">
                <p className="text-2xl font-bold gradient-text">{sellerProfiles.length}</p>
                <p className="text-xs text-slate-400">Tiendas</p>
              </div>
              <div className="glass rounded-xl px-4 py-3 text-center">
                <p className="text-2xl font-bold gradient-text-blue">{products.length}</p>
                <p className="text-xs text-slate-400">Productos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="text"
                placeholder="Buscar por nombre, vehículo, categoría..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 glass rounded-xl text-white placeholder-slate-500 focus:border-blue-400/50 transition-all duration-300"
              />
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-5 py-3.5 rounded-xl border transition-all duration-300 ${
              showFilters 
                ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30 text-blue-400 shadow-lg shadow-blue-500/10' 
                : 'glass text-slate-400 hover:text-white hover:border-white/20'
            }`}
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="font-medium">Filtros</span>
          </button>
        </div>

        {showFilters && (
          <div className="glass-card rounded-xl p-5 animate-slide-up space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="text-xs text-slate-400 mb-2 block font-medium uppercase tracking-wider">Categoría</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-blue-400/50 transition-all"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="bg-slate-900">{cat === 'all' ? 'Todas las categorías' : cat}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="text-xs text-slate-400 mb-2 block font-medium uppercase tracking-wider">Ciudad</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-blue-400/50 transition-all"
                >
                  {cities.map(city => (
                    <option key={city} value={city} className="bg-slate-900">{city === 'all' ? 'Todas las ciudades' : city}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400 flex items-center gap-2">
          <Grid3X3 className="w-4 h-4" />
          <span className="text-white font-semibold">{filteredProducts.length}</span> productos encontrados
        </p>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredProducts.map((product, index) => (
          <div 
            key={product.id} 
            className="group glass-card rounded-2xl overflow-hidden card-hover relative"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-2.5 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-blue-500/30">
                  {product.condition === 'new' ? '✨ Nuevo' : product.condition === 'used' ? 'Usado' : 'Reacondicionado'}
                </span>
                {product.forRent && (
                  <span className="px-2.5 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-amber-500/30 flex items-center gap-1">
                    <Tag className="w-3 h-3" /> Alquiler
                  </span>
                )}
              </div>

              {/* Favorite button */}
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-3 right-3 w-9 h-9 glass rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 group/fav"
              >
                <Heart className={`w-4 h-4 transition-all duration-300 ${
                  favorites.includes(product.id) 
                    ? 'text-red-400 fill-red-400 scale-110' 
                    : 'text-white group-hover/fav:text-red-400'
                }`} />
              </button>

              {/* Price */}
              <div className="absolute bottom-3 right-3">
                <span className="px-3 py-1.5 glass-strong text-white text-sm font-bold rounded-lg shadow-xl">
                  RD${product.price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="text-sm font-semibold text-white line-clamp-2 group-hover:text-blue-300 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">{product.description}</p>
              </div>

              {/* Vehicle compatibility */}
              <div className="flex flex-wrap gap-1.5">
                {product.vehicleCompatibility.slice(0, 2).map((v, i) => (
                  <span key={i} className="px-2 py-0.5 bg-white/5 border border-white/10 text-xs text-slate-400 rounded-md">
                    {v}
                  </span>
                ))}
              </div>

              {/* Location & Seller */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-blue-400" /> {product.location.city}
                </span>
                <span className="flex items-center gap-1">
                  <Store className="w-3 h-3 text-emerald-400" /> {getSellerName(product.sellerId)}
                </span>
              </div>

              {/* Stock */}
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium ${product.stock > 5 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {product.stock > 5 ? `✓ ${product.stock} disponibles` : `⚡ ¡Solo ${product.stock}!`}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => onViewProduct(product)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 glass rounded-xl text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <Eye className="w-4 h-4" /> Ver
                </button>
                <button
                  onClick={() => onAddToCart(product)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30 rounded-xl text-sm text-blue-400 hover:from-blue-500/30 hover:to-indigo-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                >
                  <ShoppingCart className="w-4 h-4" /> Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <div className="w-20 h-20 glass rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Package className="w-10 h-10 text-slate-600" />
          </div>
          <h3 className="text-lg font-semibold text-white">No se encontraron productos</h3>
          <p className="text-slate-500 mt-1">Intenta con otros filtros o términos de búsqueda</p>
        </div>
      )}
    </div>
  );
}
