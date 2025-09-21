import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";

// Import User model
import User from "./models/users.js";

// Import existing auth routes
import { changePassword, getProfile, login, register } from "./routes/auth/auth.js";

// Import Clerk webhook route
import clerkWebhookRouter from './routes/clerk/webhook.js';

// Import enhanced translation routes
import { 
  uploadDocument, 
  translateUploadedDocument,
  getTranslationProgress, 
  getExtractionProgress,
  downloadTranslatedPdf,
  cleanupTranslation,
  upload 
} from "./routes/translation/translation.js";

// Import the worker to start processing jobs
import './workers/translationWorker.js';

const app = express();

// Load environment variables first
dotenv.config();

const PORT = process.env.PORT || 5000;

// Security and performance middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false // Disable CSP for development
}));
app.use(compression());

// Enhanced rate limiting with different limits for different endpoints
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit file uploads
  message: {
    success: false,
    message: "Too many file uploads. Please wait before uploading again."
  }
});

const translationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // limit translations per hour
  message: {
    success: false,
    message: "Translation rate limit exceeded. Please wait before starting another translation."
  }
});

app.use(generalLimiter);

// Middleware setup
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ extended: true, limit: '50mb' })); 
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      process.env.FRONTEND_URL
    ].filter(Boolean);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Enhanced database connection with retry logic
const connectDB = async (retryCount = 0) => {
    const maxRetries = 3;
    const retryDelay = 5000; // 5 seconds
    
    try {
        if (!process.env.MONGODB_URL) {
            throw new Error("MONGODB_URL environment variable is not set");
        }
        
        console.log(`🔄 Attempting MongoDB connection (attempt ${retryCount + 1}/${maxRetries + 1})...`);
        
        const options = {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            family: 4,
            bufferCommands: false,
            maxPoolSize: 10,
            retryWrites: true,
            connectTimeoutMS: 10000,
        };
        
        await mongoose.connect(process.env.MONGODB_URL, options);
        console.log("✅ Database Connected Successfully to:", mongoose.connection.name || 'default database');
        
        // Test the connection
        await mongoose.connection.db.admin().ping();
        console.log("🏓 Database ping successful!");
        
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:");
        console.error(`   Attempt ${retryCount + 1} failed:`, error.message);
        
        if (retryCount < maxRetries) {
            console.log(`⏳ Retrying in ${retryDelay / 1000} seconds...`);
            setTimeout(() => connectDB(retryCount + 1), retryDelay);
        } else {
            console.error("🔴 Max connection retries exceeded. Server will continue without database.");
            if (error.message.includes('querySrv') || error.message.includes('ENOTFOUND')) {
                console.error("🌐 DNS Resolution Issue - Check internet connection and DNS settings");
            } else if (error.message.includes('IP') || error.message.includes('whitelist')) {
                console.error("🔒 IP Whitelist Issue - Verify 0.0.0.0/0 is added in MongoDB Atlas");
            } else if (error.message.includes('authentication')) {
                console.error("🔑 Authentication Issue - Check username/password");
            }
        }
    }
};

connectDB();

// subscription routes
// Paddle configuration from environment
const PADDLE_API_KEY = process.env.PADDLE_API_KEY;
const PADDLE_VENDOR_ID = process.env.PADDLE_VENDOR_ID;
const PADDLE_WEBHOOK_SECRET = process.env.PADDLE_WEBHOOK_SECRET;

// Plan to Price ID mapping (replace with your actual IDs)
const PLAN_DETAILS = {
  'FREE': { wordCredit: 5000 },
  'BASIC': { wordCredit: 50000 },
  'PRO': { wordCredit: 200000 },
  'BUSINESS': { wordCredit: 1000000 },
  'ENTERPRISE': { wordCredit: Infinity }, // Or a very large number
};

const PLAN_PRICE_IDS = {
  'FREE': null,
  'BASIC': process.env.PADDLE_BASIC_PRICE_ID,
  'PRO': process.env.PADDLE_PRO_PRICE_ID,
  'ENTERPRISE': process.env.PADDLE_ENTERPRISE_PRICE_ID
};

// Create Paddle checkout
app.post('/api/paddle/create-checkout', async (req, res) => {
  try {
    const { planName, planPrice, userEmail, customData } = req.body;

    // Validate input
    if (!planName || !userEmail) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Handle free plan
    if (planName === 'FREE') {
      // Activate free plan in your database
      // await activateFreePlan(userEmail);
      return res.json({ 
        success: true, 
        message: 'Free plan activated',
        redirect: '/dashboard'
      });
    }

    const priceId = PLAN_PRICE_IDS[planName];
    if (!priceId) {
      return res.status(400).json({ error: 'Invalid plan selected' });
    }

    // Prepare checkout data for Paddle
    const checkoutData = {
      items: [
        {
          priceId: priceId,
          quantity: 1
        }
      ],
      customer: {
        email: userEmail
      },
      customData: {
        userId: customData?.userId || 'anonymous',
        planName: planName,
        planPrice: planPrice,
        source: customData?.source || 'api',
        timestamp: new Date().toISOString()
      },
      settings: {
        displayMode: 'overlay',
        theme: 'light',
        locale: 'en',
        allowLogout: false,
        successUrl: `${process.env.FRONTEND_URL}/payment/success`,
        closeUrl: `${process.env.FRONTEND_URL}/pricing`
      }
    };

    res.json({
      success: true,
      checkoutData: checkoutData
    });

  } catch (error) {
    console.error('Checkout creation error:', error);
    res.status(500).json({ error: 'Failed to create checkout' });
  }
});

// Paddle webhook handler
app.post('/api/paddle/webhook', (req, res) => {
  try {
    const signature = req.headers['paddle-signature'];
    const payload = req.body;

    // Verify webhook signature (important for security)
    // const isValid = verifyPaddleSignature(signature, payload, PADDLE_WEBHOOK_SECRET);
    // if (!isValid) {
    //   return res.status(400).send('Invalid signature');
    // }

    console.log('Paddle webhook received:', payload);

    // Handle different webhook events
    switch (payload.event_type || payload.alert_name) {
      case 'transaction.completed':
      case 'payment_succeeded':
        handlePaymentSucceeded(payload);
        break;
      
      case 'subscription.created':
        handleSubscriptionCreated(payload);
        break;
      
      case 'subscription.updated':
        handleSubscriptionUpdated(payload);
        break;
      
      case 'subscription.cancelled':
        handleSubscriptionCancelled(payload);
        break;
      
      default:
        console.log('Unhandled webhook event:', payload.event_type || payload.alert_name);
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).send('Webhook Error');
  }
});

// --- Paddle Webhook Logic ---

/**
 * Updates a user's subscription details in the database.
 * @param {string} userEmail - The email of the user to update.
 * @param {string} paddleCustomerId - The customer ID from Paddle.
 * @param {string} planName - The new subscription plan name.
 * @param {string} status - The new subscription status.
 */
async function updateUserSubscription(userEmail, paddleCustomerId, planName, status) {
  try {
    const planDetails = PLAN_DETAILS[planName.toUpperCase()];
    if (!planDetails) {
      console.error(`Invalid plan name: ${planName}`);
      return;
    }

    const user = await User.findOneAndUpdate(
      { email: userEmail },
      {
        paddleCustomerId,
        subscriptionPlan: planName.toUpperCase(),
        subscriptionStatus: status,
        wordCredit: planDetails.wordCredit,
      },
      { new: true, upsert: true } // Create user if not exists, return new doc
    );

    console.log(`✅ User subscription updated successfully for ${user.email} to ${planName}`);
  } catch (error) {
    console.error(`❌ Error updating user subscription for ${userEmail}:`, error);
  }
}

function handleSubscriptionCreated(data) {
  const userEmail = data.customer.email;
  const paddleCustomerId = data.customer.id;
  const planName = data.items[0].price.product.name;
  const status = data.status;

  console.log(`Processing 'subscription.created' for ${userEmail}`);
  updateUserSubscription(userEmail, paddleCustomerId, planName, status);
}

function handleSubscriptionUpdated(data) {
  const userEmail = data.customer.email;
  const paddleCustomerId = data.customer.id;
  const planName = data.items[0].price.product.name;
  const status = data.status;

  console.log(`Processing 'subscription.updated' for ${userEmail}`);
  updateUserSubscription(userEmail, paddleCustomerId, planName, status);
}

function handleSubscriptionCancelled(data) {
  const userEmail = data.customer.email;
  const paddleCustomerId = data.customer.id;

  console.log(`Processing 'subscription.cancelled' for ${userEmail}`);
  // When a subscription is cancelled, we can set the plan to FREE
  // or handle it based on your business logic (e.g., access until end of billing period)
  updateUserSubscription(userEmail, paddleCustomerId, 'FREE', 'cancelled');
}

// Get user subscription status
app.get('/api/user/:email/subscription', async (req, res) => {
  try {
    const { email } = req.params;
    
    // Query your database for user's subscription
    // const subscription = await getUserSubscription(email);
    
    res.json({
      email: email,
      plan: 'basic', // Replace with actual plan
      status: 'active', // Replace with actual status
      expiryDate: new Date(),
      features: []
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get subscription' });
  }
});

// Enhanced health check route
app.get("/", (req, res) => {
    res.json({
        message: "TransBook Enhanced Backend is running",
        timestamp: new Date().toISOString(),
        version: "2.0.0",
        services: {
            database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
            translation: 'active',
            pdfGeneration: 'active',
            rateLimit: 'active'
        },
        features: {
            enhancedRateLimit: true,
            improvedErrorHandling: true,
            betterProgressTracking: true,
            robustPdfGeneration: true
        }
    });
});

// ============================================
// CLERK WEBHOOK ROUTE
// ============================================
app.use('/api/clerk-webhook', clerkWebhookRouter);


// ============================================
// AUTH ROUTES (To be deprecated by Clerk)
// ============================================
app.post("/register", register);
app.post("/login", login);
app.get("/me", getProfile);
app.post("/change-password", changePassword);

// ============================================
// ENHANCED TRANSLATION ROUTES WITH RATE LIMITING
// ============================================

// Upload and extract document (with rate limiting)
app.post("/api/upload-document", uploadLimiter, upload.single('file'), uploadDocument);

// Check extraction progress
app.get("/api/extraction-progress/:extractionId", getExtractionProgress);

// Start complete translation with enhanced rate limiting
app.post("/api/translate-document-complete", translationLimiter, translateUploadedDocument);

// Get translation progress using the jobId
app.get("/api/translation-progress/:jobId", getTranslationProgress);

// Download translated PDF using the translationId
app.get("/api/download-pdf/:translationId", downloadTranslatedPdf);

// Clean up translation data using both IDs
app.delete("/api/cleanup/:translationId/:jobId?", cleanupTranslation);

// Translation service health check
app.get("/api/translation/health", (req, res) => {
    res.json({ 
        success: true, 
        message: 'Enhanced translation service with rate limiting is running',
        timestamp: new Date().toISOString(),
        features: {
            fileUpload: 'active',
            textExtraction: 'active',
            structurePreservation: 'active',
            googleTranslate: 'active',
            rateLimiting: 'active',
            progressTracking: 'active',
            pdfGeneration: 'active',
            htmlProcessing: 'active',
            errorRecovery: 'active'
        },
        supportedFormats: ['PDF', 'DOCX', 'DOC', 'TXT'],
        maxFileSize: '50MB',
        outputFormats: ['PDF', 'HTML', 'TXT'],
        rateLimits: {
            general: '100 requests per 15 minutes',
            uploads: '10 uploads per 15 minutes',
            translations: '20 translations per hour'
        }
    });
});

// Get translation capabilities
app.get("/api/translation/capabilities", (req, res) => {
    res.json({
        success: true,
        capabilities: {
            inputFormats: [
                { format: 'PDF', maxSize: '50MB', features: ['text extraction', 'OCR fallback', 'structure preservation'] },
                { format: 'DOCX', maxSize: '50MB', features: ['text extraction', 'formatting preservation'] },
                { format: 'DOC', maxSize: '50MB', features: ['text extraction', 'basic formatting'] },
                { format: 'TXT', maxSize: '50MB', features: ['text extraction'] }
            ],
            outputFormats: [
                { format: 'PDF', features: ['professional layout', 'branded headers', 'typography'] },
                { format: 'HTML', features: ['structured content', 'responsive design'] },
                { format: 'TXT', features: ['plain text', 'lightweight'] }
            ],
            languages: {
                supported: '100+ languages',
                popular: ['Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Chinese', 'Japanese', 'Arabic'],
                note: 'Powered by Google Translate API with enhanced rate limiting'
            },
            processing: {
                averageSpeed: '3-8 minutes per document (with rate limiting)',
                maxDocumentSize: '50MB',
                preservesFormatting: true,
                batchProcessing: false,
                retryMechanism: true,
                errorRecovery: true
            },
            rateLimits: {
                requestsPerMinute: 30,
                maxRetries: 3,
                backoffStrategy: 'exponential'
            }
        }
    });
});

// Rate limit status endpoint
app.get("/api/rate-limit/status", (req, res) => {
    res.json({
        success: true,
        rateLimits: {
            general: {
                windowMs: 15 * 60 * 1000,
                max: 100,
                remaining: req.rateLimit ? req.rateLimit.remaining : 'N/A'
            },
            uploads: {
                windowMs: 15 * 60 * 1000,
                max: 10
            },
            translations: {
                windowMs: 60 * 60 * 1000,
                max: 20
            }
        },
        recommendations: {
            spacing: 'Space requests at least 2 seconds apart',
            retries: 'Use exponential backoff for retries',
            monitoring: 'Monitor rate limit headers in responses'
        }
    });
});

// ============================================
// ENHANCED ERROR HANDLING MIDDLEWARE
// ============================================

// Handle CORS preflight
app.options('*', cors());

// Handle multer errors
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    
    // Rate limit errors
    if (error.message === 'Not allowed by CORS') {
        return res.status(403).json({
            success: false,
            message: 'CORS policy violation',
            allowedOrigins: ['http://localhost:3000', process.env.FRONTEND_URL].filter(Boolean)
        });
    }
    
    // File upload errors
    if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            success: false,
            message: 'File too large. Maximum size is 50MB.',
            maxSize: '50MB',
            receivedSize: req.file?.size ? `${Math.round(req.file.size / 1024 / 1024)}MB` : 'unknown'
        });
    }
    
    if (error.message.includes('Invalid file type')) {
        return res.status(400).json({
            success: false,
            message: error.message,
            supportedFormats: ['PDF', 'DOC', 'DOCX', 'TXT'],
            receivedType: req.file?.mimetype || 'unknown'
        });
    }

    // Translation API errors
    if (error.message.includes('Too Many Requests')) {
        return res.status(429).json({
            success: false,
            message: 'Translation API rate limit exceeded. Please wait before retrying.',
            retryAfter: '60 seconds',
            suggestions: [
                'Wait 1 minute before retrying',
                'Try translating smaller sections',
                'Use fewer concurrent translations'
            ]
        });
    }

    // PDF processing errors
    if (error.message.includes('PDF extraction') || error.message.includes('puppeteer')) {
        return res.status(500).json({
            success: false,
            message: 'Document processing error. Please try with a different document or format.',
            suggestions: [
                'Try converting to TXT or DOCX format',
                'Ensure PDF is not password protected',
                'Check if PDF contains readable text'
            ],
            supportedAlternatives: ['TXT', 'DOCX']
        });
    }
    
    // MongoDB errors
    if (error.name === 'MongoError' || error.name === 'MongooseError') {
        return res.status(503).json({
            success: false,
            message: 'Database temporarily unavailable. Please try again later.',
            retryAfter: '30 seconds'
        });
    }
    
    // Generic server error
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        timestamp: new Date().toISOString(),
        requestId: req.id || Date.now()
    });
});

// Handle 404 routes
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.originalUrl} not found`,
        timestamp: new Date().toISOString(),
        availableRoutes: {
            auth: [
                'POST /register',
                'POST /login',
                'GET /me',
                'POST /change-password'
            ],
            translation: [
                'POST /api/upload-document',
                'GET /api/extraction-progress/:extractionId',
                'POST /api/translate-document-complete',
                'GET /api/translation-progress/:translationId',
                'GET /api/download-pdf/:translationId',
                'DELETE /api/cleanup/:translationId'
            ],
            info: [
                'GET /',
                'GET /api/translation/health',
                'GET /api/translation/capabilities',
                'GET /api/rate-limit/status'
            ]
        }
    });
});

// Graceful shutdown handling
process.on('SIGTERM', async () => {
    console.log('🛑 SIGTERM received, shutting down gracefully...');
    
    if (mongoose.connection.readyState === 1) {
        await mongoose.connection.close();
        console.log('📊 Database connection closed');
    }
    
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('🛑 SIGINT received, shutting down gracefully...');
    
    if (mongoose.connection.readyState === 1) {
        await mongoose.connection.close();
        console.log('📊 Database connection closed');
    }
    
    process.exit(0);
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 TransBook Enhanced Backend Server Running`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`⚡ Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🛡️  Security: Helmet enabled`);
    console.log(`🔄 Compression: Active`);
    console.log(`⏱️  Rate Limiting: Enhanced multi-tier`);
    console.log("");
    console.log("📚 Available Endpoints:");
    console.log("   🔐 Authentication:");
    console.log("     POST /register");
    console.log("     POST /login");
    console.log("     GET  /me");
    console.log("     POST /change-password");
    console.log("");
    console.log("   📄 Enhanced Translation (Rate Limited):");
    console.log("     POST /api/upload-document              - Upload & extract (10/15min)");
    console.log("     GET  /api/extraction-progress/:id      - Check PDF extraction progress");
    console.log("     POST /api/translate-document-complete  - Full translation (20/hour)");
    console.log("     GET  /api/translation-progress/:id     - Track translation progress");
    console.log("     GET  /api/download-pdf/:id             - Download translated PDF");
    console.log("     DEL  /api/cleanup/:id                  - Clean up data");
    console.log("");
    console.log("   ℹ️  Information & Monitoring:");
    console.log("     GET  /                                 - Health check");
    console.log("     GET  /api/translation/health           - Service status");
    console.log("     GET  /api/translation/capabilities     - Feature info");
    console.log("     GET  /api/rate-limit/status            - Rate limit status");
    console.log("");
    console.log("✨ Enhanced Features:");
    console.log("   • Smart rate limiting with Google Translate API");
    console.log("   • Exponential backoff retry mechanism");
    console.log("   • Better error recovery and reporting");
    console.log("   • Multi-tier rate limiting (general/uploads/translations)");
    console.log("   • Enhanced CORS configuration");
    console.log("   • Graceful shutdown handling");
});