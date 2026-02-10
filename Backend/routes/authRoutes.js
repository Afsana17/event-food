const express = require('express');
const authController = require('../controller/authController');
const { verifyToken } = require('../middleware/auth');
const { 
  validateRegistration, 
  validateLogin, 
  validateOTP, 
  validateResendOTP 
} = require('../middleware/validator');
const { authLimiter, otpLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// Route to register a new user (with validation and rate limiting)
router.post('/register', authLimiter, validateRegistration, authController.registerUser);

// Route to verify OTP (with validation and rate limiting)
router.post('/verify-otp', otpLimiter, validateOTP, authController.verifyOTP);

// Route to resend OTP (with validation and rate limiting)
router.post('/resend-otp', otpLimiter, validateResendOTP, authController.resendOTP);

// Route to login user (with validation and rate limiting)
router.post('/login', authLimiter, validateLogin, authController.loginUser);

// Route to get current user (protected route with JWT verification)
router.get('/me', verifyToken, authController.getMe);

module.exports = router;
