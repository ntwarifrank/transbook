import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";

// Import existing auth routes
import { changePassword, getProfile, login, register } from "./routes/auth/auth.js";

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
// AUTH ROUTES
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

// Get translation progress
app.get("/api/translation-progress/:translationId", getTranslationProgress);

// Download translated PDF
app.get("/api/download-pdf/:translationId", downloadTranslatedPdf);

// Clean up translation data
app.delete("/api/cleanup/:translationId", cleanupTranslation);

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