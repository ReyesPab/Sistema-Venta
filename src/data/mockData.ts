import { Product, SellerProfile, Order } from '../types';

export const sellerProfiles: SellerProfile[] = [
  {
    userId: '2',
    businessName: 'AutoParts Santo Domingo',
    description: 'Las mejores partes para tu vehículo. Más de 15 años de experiencia en el mercado automotriz.',
    location: {
      address: 'Av. Winston Churchill #45',
      city: 'Santo Domingo',
      state: 'Distrito Nacional',
      lat: 18.4861,
      lng: -69.9312
    },
    phone: '+1 809-555-0002',
    schedule: 'Lun-Sáb 8:00AM - 6:00PM',
    subscriptionType: 'monthly',
    subscriptionActive: true,
    rating: 4.8,
    totalSales: 342
  },
  {
    userId: '4',
    businessName: 'Repuestos El Turbo',
    description: 'Especialistas en partes de motor y transmisión. Envíos a todo el país.',
    location: {
      address: 'Calle Duarte #120',
      city: 'Santiago',
      state: 'Santiago',
      lat: 19.4517,
      lng: -70.6970
    },
    phone: '+1 809-555-0010',
    schedule: 'Lun-Vie 9:00AM - 5:00PM',
    subscriptionType: 'admin_approved',
    subscriptionActive: true,
    rating: 4.5,
    totalSales: 198
  }
];

export const products: Product[] = [
  {
    id: '1',
    sellerId: '2',
    name: 'Pastillas de Freno Delanteras - Toyota Corolla 2020',
    description: 'Pastillas de freno cerámicas de alta calidad para Toyota Corolla 2018-2023. Incluye sensores de desgaste.',
    price: 3500,
    category: 'Frenos',
    subcategory: 'Pastillas',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400'],
    condition: 'new',
    stock: 25,
    location: { address: 'Av. Winston Churchill #45', city: 'Santo Domingo' },
    vehicleCompatibility: ['Toyota Corolla 2018-2023'],
    createdAt: '2024-03-01',
    available: true
  },
  {
    id: '2',
    sellerId: '2',
    name: 'Filtro de Aceite - Honda Civic 2019',
    description: 'Filtro de aceite OEM para Honda Civic. Máxima protección para tu motor.',
    price: 850,
    category: 'Motor',
    subcategory: 'Filtros',
    images: ['https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400'],
    condition: 'new',
    stock: 50,
    location: { address: 'Av. Winston Churchill #45', city: 'Santo Domingo' },
    vehicleCompatibility: ['Honda Civic 2016-2021'],
    createdAt: '2024-03-05',
    available: true
  },
  {
    id: '3',
    sellerId: '2',
    name: 'Amortiguadores Traseros - Hyundai Tucson',
    description: 'Par de amortiguadores traseros gas. Mejoramiento de suspensión para Hyundai Tucson 2017-2022.',
    price: 8500,
    category: 'Suspensión',
    subcategory: 'Amortiguadores',
    images: ['https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=400'],
    condition: 'new',
    stock: 10,
    location: { address: 'Av. Winston Churchill #45', city: 'Santo Domingo' },
    vehicleCompatibility: ['Hyundai Tucson 2017-2022'],
    createdAt: '2024-03-10',
    available: true
  },
  {
    id: '4',
    sellerId: '4',
    name: 'Kit de Distribución Completo - Nissan Sentra',
    description: 'Incluye correa, tensores y rodillos. Para Nissan Sentra 2015-2020.',
    price: 12000,
    category: 'Motor',
    subcategory: 'Distribución',
    images: ['https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400'],
    condition: 'new',
    stock: 8,
    location: { address: 'Calle Duarte #120', city: 'Santiago' },
    vehicleCompatibility: ['Nissan Sentra 2015-2020'],
    createdAt: '2024-03-12',
    available: true
  },
  {
    id: '5',
    sellerId: '4',
    name: 'Faros LED Delanteros - KIA Sportage',
    description: 'Par de faros LED completos para KIA Sportage 2018-2023. Instalación plug & play.',
    price: 15000,
    category: 'Eléctrico',
    subcategory: 'Iluminación',
    images: ['https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400'],
    condition: 'new',
    stock: 5,
    location: { address: 'Calle Duarte #120', city: 'Santiago' },
    vehicleCompatibility: ['KIA Sportage 2018-2023'],
    createdAt: '2024-03-15',
    available: true,
    forRent: true,
    rentalPrice: 2000
  },
  {
    id: '6',
    sellerId: '2',
    name: 'Radiador de Aluminio - Ford Explorer 2016',
    description: 'Radiador de aluminio de alto rendimiento. Mejor disipación de calor.',
    price: 9800,
    category: 'Refrigeración',
    subcategory: 'Radiadores',
    images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400'],
    condition: 'new',
    stock: 3,
    location: { address: 'Av. Winston Churchill #45', city: 'Santo Domingo' },
    vehicleCompatibility: ['Ford Explorer 2011-2019'],
    createdAt: '2024-03-18',
    available: true
  },
  {
    id: '7',
    sellerId: '4',
    name: 'Bomba de Combustible - Chevrolet Cruze',
    description: 'Bomba de combustible eléctrica completa con filtro integrado.',
    price: 6500,
    category: 'Combustible',
    subcategory: 'Bombas',
    images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400'],
    condition: 'new',
    stock: 12,
    location: { address: 'Calle Duarte #120', city: 'Santiago' },
    vehicleCompatibility: ['Chevrolet Cruze 2016-2022'],
    createdAt: '2024-03-20',
    available: true
  },
  {
    id: '8',
    sellerId: '2',
    name: 'Kit de Embrague Completo - Volkswagen Jetta',
    description: 'Incluye disco, plato y collarín. Para VW Jetta 2015-2021.',
    price: 11000,
    category: 'Transmisión',
    subcategory: 'Embrague',
    images: ['https://images.unsplash.com/photo-1542362567-b07e54358753?w=400'],
    condition: 'new',
    stock: 6,
    location: { address: 'Av. Winston Churchill #45', city: 'Santo Domingo' },
    vehicleCompatibility: ['Volkswagen Jetta 2015-2021'],
    createdAt: '2024-03-22',
    available: true
  }
];

export const orders: Order[] = [
  {
    id: 'ORD-001',
    clientId: '3',
    sellerId: '2',
    products: [
      { productId: '1', productName: 'Pastillas de Freno Delanteras - Toyota Corolla 2020', quantity: 1, price: 3500 },
      { productId: '2', productName: 'Filtro de Aceite - Honda Civic 2019', quantity: 2, price: 850 }
    ],
    total: 5200,
    status: 'confirmed',
    deliveryMethod: 'shipping',
    shippingAddress: 'Calle Principal #25, Los Mina, Santo Domingo Este',
    paymentMethod: 'Tarjeta ****4521',
    createdAt: '2024-03-25'
  },
  {
    id: 'ORD-002',
    clientId: '3',
    sellerId: '4',
    products: [
      { productId: '4', productName: 'Kit de Distribución Completo - Nissan Sentra', quantity: 1, price: 12000 }
    ],
    total: 12000,
    status: 'pending',
    deliveryMethod: 'pickup',
    paymentMethod: 'Transferencia',
    createdAt: '2024-03-26'
  }
];
