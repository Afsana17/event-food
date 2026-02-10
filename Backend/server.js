const express = require('express');
const dotenv = require('dotenv'); 
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const connectDataBase = require('./config/connectDatabase');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const foodRoutes = require('./routes/foodRoutes');
const coachRoutes = require('./routes/coachRoutes');
const adminRoutes = require('./routes/adminRoutes');
const setupRoutes = require('./routes/setupRoutes');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');


// Load environment variables first
dotenv.config({ path: path.join(__dirname, 'config/.env') });

// Initialize Express app
const app = express();

// Security middleware
app.use(helmet()); // Set security HTTP headers
app.use(mongoSanitize()); // Sanitize data against NoSQL injection

// CORS configuration - restrict to frontend origin
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json({ limit: '10kb' })); // Limit body size
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Connect to the database
connectDataBase();

// Setup routes (before any middleware)
app.use('/api/setup', setupRoutes);

// Rate limiting for other routes (skip /api/setup)
app.use('/api/', (req, res, next) => {
  if (req.path.startsWith('/setup')) {
    return next();
  }
  apiLimiter(req, res, next);
});

// Use routes
// IMPORTANT: More specific routes must come before general ones
app.use('/api/auth', authRoutes);  // Auth routes
app.use('/api/admin', adminRoutes);  // Admin routes
app.use('/api/products', productRoutes);  // Product routes (must be before /api routes)
app.use('/api', eventRoutes);  // Event routes (MUST be before userRoutes for public access)
app.use('/api', foodRoutes);  // Food routes
app.use('/api', coachRoutes);  // Coach routes
app.use('/api', userRoutes);  // User routes (has global auth middleware)

// Handle undefined routes
app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot find ${req.originalUrl} on this server`,
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

module.exports = app;
