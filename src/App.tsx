import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Product } from './types';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import OrdersPage from './pages/OrdersPage';
import ChatPage from './pages/ChatPage';
import SettingsPage from './pages/SettingsPage';
import UsersPage from './pages/UsersPage';
import SellerProfilePage from './pages/SellerProfilePage';
import { CheckCircle, Heart, Sparkles } from 'lucide-react';

function AppContent() {
  const { user, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [showCartNotification, setShowCartNotification] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen mesh-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative w-20 h-20 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          </div>
          <p className="text-slate-400 mt-4 font-medium">Cargando sistema...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setShowCartNotification(true);
    setTimeout(() => setShowCartNotification(false), 3000);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  const renderPage = () => {
    if (selectedProduct && currentPage === 'product-detail') {
      return (
        <ProductDetailPage
          product={selectedProduct}
          onBack={() => { setSelectedProduct(null); setCurrentPage('catalog'); }}
          onAddToCart={(product, qty) => handleAddToCart(product, qty)}
        />
      );
    }

    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'catalog':
        return (
          <CatalogPage
            onAddToCart={(product) => handleAddToCart(product, 1)}
            onViewProduct={handleViewProduct}
          />
        );
      case 'products':
        return (
          <CatalogPage
            onAddToCart={(product) => handleAddToCart(product, 1)}
            onViewProduct={handleViewProduct}
          />
        );
      case 'orders':
        return <OrdersPage />;
      case 'chat':
        return <ChatPage />;
      case 'settings':
        return <SettingsPage />;
      case 'users':
        return <UsersPage />;
      case 'sellers':
        return <UsersPage />;
      case 'profile':
        return <SellerProfilePage />;
      case 'favorites':
        return <FavoritesPlaceholder />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <>
      <Layout currentPage={currentPage} onNavigate={(page) => { setCurrentPage(page); setSelectedProduct(null); }}>
        {renderPage()}
      </Layout>

      {/* Cart notification */}
      {showCartNotification && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div className="glass-card rounded-2xl px-5 py-4 shadow-2xl shadow-emerald-500/20 flex items-center gap-4 border border-emerald-500/20">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl blur-md opacity-50"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-white flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                ¡Agregado al carrito!
              </p>
              <p className="text-xs text-slate-400">{cart.length} {cart.length === 1 ? 'producto' : 'productos'} en el carrito</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function FavoritesPlaceholder() {
  return (
    <div className="text-center py-20 animate-fade-in">
      <div className="relative inline-block mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl blur-2xl opacity-20"></div>
        <div className="relative w-20 h-20 glass-card rounded-2xl flex items-center justify-center">
          <Heart className="w-10 h-10 text-rose-400" />
        </div>
      </div>
      <h3 className="text-lg font-bold text-white">Tus Favoritos</h3>
      <p className="text-slate-500 mt-2 max-w-sm mx-auto">Los productos que marques como favoritos aparecerán aquí para acceso rápido.</p>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
