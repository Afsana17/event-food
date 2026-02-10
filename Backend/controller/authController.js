const User = require('../models/user');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendOTPEmail, sendWelcomeEmail } = require('../utils/emailService');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// Generate OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password, age, dob, qualification, role, phone, address, organizerProfile, vendorProfile, coachProfile } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists with this email' 
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create new user with role-specific data
    const userData = {
      name,
      email,
      password,
      age,
      dob,
      qualification,
      otp,
      otpExpire,
      isVerified: false,
      role: role || 'user',
      phone,
      address,
    };

    // Add role-specific profiles if provided
    if (role === 'event_organizer' && organizerProfile) {
      userData.organizerProfile = organizerProfile;
    }
    if (role === 'vendor' && vendorProfile) {
      userData.vendorProfile = vendorProfile;
    }
    if (role === 'coach' && coachProfile) {
      userData.coachProfile = coachProfile;
    }

    const user = await User.create(userData);

    // Send OTP email
    try {
      await sendOTPEmail(email, name, otp);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue even if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Registration successful! Please check your email for OTP verification.',
      userId: user._id,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

// Verify OTP
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Validate input
    if (!email || !otp) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide email and OTP' 
      });
    }

    // Find user with OTP
    const user = await User.findOne({ email }).select('+otp +otpExpire');

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Check if already verified
    if (user.isVerified) {
      return res.status(400).json({ 
        success: false,
        message: 'Account already verified' 
      });
    }

    // Check if OTP expired
    if (user.otpExpire < Date.now()) {
      return res.status(400).json({ 
        success: false,
        message: 'OTP has expired. Please request a new one.' 
      });
    }

    // Verify OTP
    if (user.otp !== otp) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid OTP' 
      });
    }

    // Update user as verified
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();

    // Send welcome email
    try {
      await sendWelcomeEmail(user.email, user.name);
    } catch (emailError) {
      console.error('Welcome email failed:', emailError);
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Account verified successfully!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

// Resend OTP
const resendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide email' 
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    if (user.isVerified) {
      return res.status(400).json({ 
        success: false,
        message: 'Account already verified' 
      });
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpire = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpire = otpExpire;
    await user.save();

    // Send OTP email
    try {
      await sendOTPEmail(email, user.name, otp);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      return res.status(500).json({ 
        success: false,
        message: 'Failed to send OTP email' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'New OTP sent to your email',
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide email and password' 
      });
    }

    // Find user and include password
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(401).json({ 
        success: false,
        message: 'Please verify your account first. Check your email for OTP.',
        requiresVerification: true,
        email: user.email,
      });
    }

    // Check password
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    // Check if special roles need approval (except admin and regular users)
    if (!['user', 'admin'].includes(user.role) && !user.isApproved) {
      return res.status(403).json({ 
        success: false,
        message: 'Your account is pending admin approval. Please wait for approval before logging in.',
        requiresApproval: true,
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        isApproved: user.isApproved,
      },
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

// Get current logged in user
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

module.exports = {
  registerUser,
  verifyOTP,
  resendOTP,
  loginUser,
  getMe,
};
