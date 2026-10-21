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

function AppContent() {
  const { user, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [showCartNotification, setShowCartNotification] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Cargando...</p>
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
          <div className="bg-emerald-500/90 backdrop-blur-sm text-white px-5 py-3 rounded-xl shadow-lg shadow-emerald-500/30 flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">¡Agregado al carrito!</p>
              <p className="text-xs opacity-80">{cart.length} productos en el carrito</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function FavoritesPlaceholder() {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-white">Tus Favoritos</h3>
      <p className="text-slate-400 mt-1">Los productos que marques como favoritos aparecerán aquí.</p>
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
