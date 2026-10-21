export type UserRole = 'admin' | 'seller' | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  verified: boolean;
  createdAt: string;
}

export interface SellerProfile {
  userId: string;
  businessName: string;
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    lat: number;
    lng: number;
  };
  phone: string;
  schedule: string;
  subscriptionType: 'monthly' | 'admin_approved';
  subscriptionActive: boolean;
  rating: number;
  totalSales: number;
}

export interface Product {
  id: string;
  sellerId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  images: string[];
  condition: 'new' | 'used' | 'refurbished';
  stock: number;
  location: {
    address: string;
    city: string;
  };
  vehicleCompatibility: string[];
  createdAt: string;
  available: boolean;
  forRent?: boolean;
  rentalPrice?: number;
}

export interface Order {
  id: string;
  clientId: string;
  sellerId: string;
  products: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  deliveryMethod: 'pickup' | 'shipping';
  shippingAddress?: string;
  paymentMethod: string;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string;
  isAI?: boolean;
}

export interface SystemConfig {
  verificationMethod: 'email' | 'phone' | 'both';
  currency: string;
  monthlySubscriptionPrice: number;
  maxProducts: number;
  maintenanceMode: boolean;
}
