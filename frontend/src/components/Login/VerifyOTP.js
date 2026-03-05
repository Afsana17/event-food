import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Link,
  LinearProgress,
} from '@mui/material';
import {
  VerifiedUser,
  Email,
  Timer,
  CheckCircle,
} from '@mui/icons-material';
import Logo from './Logo';

const VerifyOTP = ({ email, name, onVerified }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await axios.post(`${API_URL}/auth/verify-otp`, {
        email,
        otp,
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setSuccess(true);
        
        if (onVerified) {
          onVerified();
        }
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResending(true);
    setError('');

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await axios.post(`${API_URL}/auth/resend-otp`, {
        email,
      });

      if (response.data.success) {
        setTimeLeft(600); // Reset timer
        setOtp('');
        setError('');
        alert('New OTP sent to your email!');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setResending(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0A1929 0%, #1A2332 50%, #0D1B2A 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(76, 175, 80, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'pulse 8s ease-in-out infinite',
        },
        '@keyframes pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: 0.5 },
          '50%': { transform: 'scale(1.15)', opacity: 0.8 },
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 10 }}>
        <Card 
          elevation={24} 
          sx={{ 
            borderRadius: 5,
            backdropFilter: 'blur(20px)',
            border: success ? '2px solid rgba(76, 175, 80, 0.3)' : '1px solid rgba(255, 215, 0, 0.1)',
          }}
        >
          <CardContent sx={{ p: 6 }}>
            {success ? (
              <Box sx={{ textAlign: 'center' }}>
                <CheckCircle
                  sx={{
                    fontSize: 100,
                    color: 'success.main',
                    mb: 3,
                    animation: 'scaleIn 0.5s ease-out',
                    '@keyframes scaleIn': {
                      '0%': { transform: 'scale(0)' },
                      '50%': { transform: 'scale(1.2)' },
                      '100%': { transform: 'scale(1)' },
                    },
                  }}
                />
                <Typography variant="h3" sx={{ mb: 2, fontWeight: 800 }}>
                  Verification Successful!
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Redirecting you to dashboard...
                </Typography>
                <LinearProgress 
                  sx={{ 
                    borderRadius: 2,
                    height: 6,
                    backgroundColor: 'rgba(76, 175, 80, 0.2)',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #4CAF50, #81C784)',
                    },
                  }} 
                />
              </Box>
            ) : (
              <>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Logo size="medium" />
                  
                  <Box sx={{ mt: 3, mb: 2 }}>
                    <VerifiedUser
                      sx={{
                        fontSize: 70,
                        color: 'primary.main',
                        mb: 2,
                      }}
                    />
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        mb: 1.5,
                        fontWeight: 800,
                        fontSize: { xs: '1.5rem', sm: '2rem' },
                      }}
                    >
                      Verify Your Account
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2, fontWeight: 500 }}>
                      We've sent a 6-digit code to
                    </Typography>
                    <Box 
                      sx={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: 1,
                        background: 'rgba(255, 215, 0, 0.1)',
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                      }}
                    >
                      <Email sx={{ color: 'primary.main', fontSize: 20 }} />
                      <Typography variant="body1" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        {email}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3, 
                  borderRadius: 3,
                  fontWeight: 600,
                }}
              >
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                label="Enter OTP"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 6) {
                    setOtp(value);
                  }
                }}
                required
                autoFocus
                placeholder="000000"
                inputProps={{
                  maxLength: 6,
                  style: { 
                    textAlign: 'center', 
                    fontSize: '28px', 
                    letterSpacing: '12px',
                    fontWeight: 800,
                  }
                }}
                sx={{ 
                  mb: 2,
                  '& input': {
                    fontFamily: 'monospace',
                  },
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(255, 215, 0, 0.05)',
                    '&.Mui-focused': {
                      background: 'rgba(255, 215, 0, 0.1)',
                    },
                  },
                }}
              />

              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: 1.5,
                mb: 3,
                p: 2.5,
                borderRadius: 3,
                background: timeLeft <= 60 
                  ? 'rgba(255, 82, 82, 0.1)' 
                  : 'rgba(76, 175, 80, 0.1)',
                border: `2px solid ${timeLeft <= 60 ? 'rgba(255, 82, 82, 0.3)' : 'rgba(76, 175, 80, 0.3)'}`,
              }}>
                <Timer 
                  sx={{ 
                    color: timeLeft <= 60 ? 'error.main' : 'success.main',
                    fontSize: 28,
                  }} 
                />
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    color: timeLeft <= 60 ? 'error.main' : 'success.main',
                  }}
                >
                  {timeLeft > 0 ? `Expires in ${formatTime(timeLeft)}` : 'Code Expired'}
                </Typography>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading || timeLeft <= 0}
                sx={{ 
                  mb: 2, 
                  py: 1.8,
                  fontSize: '1.1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                {loading ? <CircularProgress size={26} sx={{ color: '#000' }} /> : 'Verify OTP'}
              </Button>

              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Didn't receive the code?{' '}
                  <Link
                    component="button"
                    type="button"
                    onClick={handleResendOTP}
                    disabled={resending}
                    sx={{
                      color: 'primary.main',
                      fontWeight: 700,
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                      '&:hover': {
                        textDecoration: 'underline',
                        color: 'primary.light',
                      },
                    }}
                  >
                    {resending ? 'Sending...' : 'Resend OTP'}
                  </Link>
                </Typography>
              </Box>
            </Box>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default VerifyOTP;
