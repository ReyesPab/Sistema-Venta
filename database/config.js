// ============================================
// Database Configuration - AutoParts Pro
// ============================================

module.exports = {
  // MongoDB Connection
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/autoparts_pro',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }
  },

  // Alternative: PostgreSQL Configuration (usando Prisma)
  postgresql: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'autoparts_pro',
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || '',
    ssl: process.env.DB_SSL === 'true',
  },

  // Redis Cache Configuration
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || '',
    ttl: 3600 // 1 hour default TTL
  },

  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-key-change-in-production',
    expiresIn: '7d',
    refreshExpiresIn: '30d'
  },

  // Email Configuration (for verification)
  email: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    from: process.env.EMAIL_FROM || 'noreply@autopartspro.com'
  },

  // SMS Configuration (for phone verification)
  sms: {
    provider: process.env.SMS_PROVIDER || 'twilio',
    accountSid: process.env.TWILIO_SID,
    authToken: process.env.TWILIO_TOKEN,
    fromNumber: process.env.TWILIO_PHONE
  },

  // Payment Configuration
  payment: {
    atlantida: {
      apiKey: process.env.ATLANTIDA_API_KEY,
      secretKey: process.env.ATLANTIDA_SECRET_KEY,
      webhookUrl: process.env.ATLANTIDA_WEBHOOK_URL,
      sandbox: process.env.NODE_ENV !== 'production'
    },
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET
    }
  },

  // AI Chat Configuration
  ai: {
    provider: 'openai',
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-4',
    maxTokens: 1000,
    temperature: 0.7
  },

  // File Storage Configuration
  storage: {
    provider: process.env.STORAGE_PROVIDER || 'local', // 'local', 's3', 'cloudinary'
    localPath: './uploads',
    s3: {
      bucket: process.env.S3_BUCKET,
      region: process.env.S3_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp']
  },

  // Rate Limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  },

  // Security
  security: {
    bcryptRounds: 12,
    verificationCodeLength: 6,
    verificationCodeExpiry: 10 * 60 * 1000, // 10 minutes
    passwordMinLength: 8,
    sessionMaxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  }
};
