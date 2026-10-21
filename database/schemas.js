// ============================================
// MongoDB Schema Definitions - AutoParts Pro
// Usando Mongoose ODM
// ============================================

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// ============================================
// USER SCHEMA
// ============================================
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'seller', 'client'], 
    default: 'client',
    required: true 
  },
  avatar: { type: String, default: null },
  verified: { type: Boolean, default: false },
  verificationCode: { type: String, default: null },
  verificationExpiry: { type: Date, default: null },
  verificationMethod: { type: String, enum: ['email', 'phone', 'both'], default: 'both' },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

// ============================================
// SELLER PROFILE SCHEMA
// ============================================
const sellerProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  businessName: { type: String, required: true },
  description: { type: String, default: '' },
  logo: { type: String, default: null },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    coordinates: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true } // [longitude, latitude]
    }
  },
  phone: { type: String, required: true },
  whatsapp: { type: String, default: null },
  schedule: { type: String, default: '' },
  subscription: {
    type: { type: String, enum: ['monthly', 'admin_approved'], required: true },
    active: { type: Boolean, default: false },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
    autoRenew: { type: Boolean, default: true }
  },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  totalReviews: { type: Number, default: 0 },
  totalSales: { type: Number, default: 0 },
  totalRevenue: { type: Number, default: 0 },
  isApproved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Geospatial index for location queries
sellerProfileSchema.index({ 'location.coordinates': '2dsphere' });

const SellerProfile = mongoose.model('SellerProfile', sellerProfileSchema);

// ============================================
// PRODUCT SCHEMA
// ============================================
const productSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  subcategory: { type: String, default: '' },
  images: [{ type: String }],
  condition: { 
    type: String, 
    enum: ['new', 'used', 'refurbished'], 
    default: 'new' 
  },
  stock: { type: Number, required: true, min: 0, default: 0 },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true }
  },
  vehicleCompatibility: [{ type: String }],
  partNumber: { type: String, default: null },
  brand: { type: String, default: null },
  warranty: { type: String, default: '' },
  forSale: { type: Boolean, default: true },
  forRent: { type: Boolean, default: false },
  rentalPrice: { type: Number, default: null },
  rentalPeriod: { type: String, enum: ['daily', 'weekly', 'monthly'], default: 'daily' },
  available: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Text search index
productSchema.index({ name: 'text', description: 'text', vehicleCompatibility: 'text' });
productSchema.index({ category: 1, price: 1 });
productSchema.index({ sellerId: 1 });

const Product = mongoose.model('Product', productSchema);

// ============================================
// ORDER SCHEMA
// ============================================
const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true }
  }],
  subtotal: { type: Number, required: true },
  shippingCost: { type: Number, default: 0 },
  total: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },
  deliveryMethod: { 
    type: String, 
    enum: ['pickup', 'shipping'], 
    required: true 
  },
  shippingAddress: {
    fullName: { type: String },
    address: { type: String },
    city: { type: String },
    phone: { type: String },
    notes: { type: String }
  },
  payment: {
    method: { type: String, enum: ['card', 'transfer', 'cash'], required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
    transactionId: { type: String, default: null },
    cardLast4: { type: String, default: null }
  },
  trackingNumber: { type: String, default: null },
  notes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

orderSchema.index({ clientId: 1, createdAt: -1 });
orderSchema.index({ sellerId: 1, status: 1 });

const Order = mongoose.model('Order', orderSchema);

// ============================================
// CHAT MESSAGE SCHEMA
// ============================================
const chatMessageSchema = new mongoose.Schema({
  conversationId: { type: String, required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  isAI: { type: Boolean, default: false },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

chatMessageSchema.index({ conversationId: 1, createdAt: -1 });

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

// ============================================
// SYSTEM CONFIG SCHEMA
// ============================================
const systemConfigSchema = new mongoose.Schema({
  verificationMethod: { type: String, enum: ['email', 'phone', 'both'], default: 'both' },
  currency: { type: String, default: 'DOP' },
  monthlySubscriptionPrice: { type: Number, default: 1500 },
  maxProductsPerSeller: { type: Number, default: 50 },
  maintenanceMode: { type: Boolean, default: false },
  shippingRates: [{
    city: { type: String, required: true },
    rate: { type: Number, required: true }
  }],
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const SystemConfig = mongoose.model('SystemConfig', systemConfigSchema);

// ============================================
// REVIEWS SCHEMA
// ============================================
const reviewSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, default: '' },
  images: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

// ============================================
// EXPORTS
// ============================================
module.exports = {
  User,
  SellerProfile,
  Product,
  Order,
  ChatMessage,
  SystemConfig,
  Review
};
