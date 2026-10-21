import React, { useState } from 'react';
import { products, sellerProfiles } from '../data/mockData';
import { Search, Filter, MapPin, Star, ShoppingCart, Heart, Eye, Tag, Truck, Store, Package } from 'lucide-react';
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
      <div className="bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 border border-indigo-500/20 rounded-2xl p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white">Venta de Partes</h2>
            <p className="text-indigo-200/70 mt-1">Encuentra las mejores partes para tu vehículo</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-indigo-200/60">
            <Store className="w-4 h-4" />
            <span>{sellerProfiles.length} tiendas activas</span>
          </div>
        </div>
      </div>

      {/* Search and filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, vehículo, categoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30 transition-all"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all ${
              showFilters ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-slate-900/50 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <Filter className="w-5 h-5" />
            <span>Filtros</span>
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-3 p-4 bg-slate-900/30 border border-white/5 rounded-xl">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Categoría</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400/50"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === 'all' ? 'Todas' : cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Ciudad</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400/50"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city === 'all' ? 'Todas' : city}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          <span className="text-white font-medium">{filteredProducts.length}</span> productos encontrados
        </p>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-white/15 transition-all hover:shadow-xl hover:shadow-blue-500/5">
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-2 py-1 bg-blue-500/90 text-white text-xs font-medium rounded-lg">
                  {product.condition === 'new' ? 'Nuevo' : product.condition === 'used' ? 'Usado' : 'Reacondicionado'}
                </span>
                {product.forRent && (
                  <span className="px-2 py-1 bg-amber-500/90 text-white text-xs font-medium rounded-lg flex items-center gap-1">
                    <Tag className="w-3 h-3" /> Alquiler
                  </span>
                )}
              </div>

              {/* Favorite button */}
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-3 right-3 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/20 transition-all"
              >
                <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'text-red-400 fill-red-400' : 'text-white'}`} />
              </button>

              {/* Price */}
              <div className="absolute bottom-3 right-3">
                <span className="px-3 py-1.5 bg-slate-900/90 backdrop-blur-sm text-white text-sm font-bold rounded-lg">
                  RD${product.price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="text-sm font-semibold text-white line-clamp-2 group-hover:text-blue-300 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{product.description}</p>
              </div>

              {/* Vehicle compatibility */}
              <div className="flex flex-wrap gap-1">
                {product.vehicleCompatibility.slice(0, 2).map((v, i) => (
                  <span key={i} className="px-2 py-0.5 bg-white/5 text-xs text-slate-300 rounded">
                    {v}
                  </span>
                ))}
              </div>

              {/* Location & Seller */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {product.location.city}
                </span>
                <span className="flex items-center gap-1">
                  <Store className="w-3 h-3" /> {getSellerName(product.sellerId)}
                </span>
              </div>

              {/* Stock */}
              <div className="flex items-center justify-between">
                <span className={`text-xs ${product.stock > 5 ? 'text-green-400' : 'text-amber-400'}`}>
                  {product.stock > 5 ? `${product.stock} disponibles` : `¡Solo ${product.stock} disponibles!`}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => onViewProduct(product)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Eye className="w-4 h-4" /> Ver
                </button>
                <button
                  onClick={() => onAddToCart(product)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm text-blue-400 hover:bg-blue-500/20 transition-all"
                >
                  <ShoppingCart className="w-4 h-4" /> Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white">No se encontraron productos</h3>
          <p className="text-slate-400 mt-1">Intenta con otros filtros o términos de búsqueda</p>
        </div>
      )}
    </div>
  );
}
