import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
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
  Link,
  InputAdornment,
  IconButton,
  CircularProgress,
  Dialog,
  Divider,
  Fade,
  Zoom,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
  SportsSoccer,
  EmojiEvents,
  SecurityUpdate,
} from '@mui/icons-material';
import Logo from './Logo';
import VerifyOTP from './VerifyOTP';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState('');
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { email, password } = formData;

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.response?.data?.requiresVerification) {
        setUnverifiedEmail(email);
        setShowOTPDialog(true);
        setError('');
      } else {
        setError(err.response?.data?.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerified = () => {
    setShowOTPDialog(false);
  };

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #BFDBFE 100%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-10%',
            right: '-5%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-10%',
            left: '-5%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(30, 64, 175, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
          },
        }}
      >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 10 }}>
        <Fade in={mounted} timeout={800}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              overflow: 'visible',
              border: '1px solid #E2E8F0',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #1E40AF, #3B82F6, #1E40AF)',
                borderRadius: '16px 16px 0 0'
              }
            }}
          >
            <CardContent sx={{ p: { xs: 4, sm: 6 } }}>
              <Zoom in={mounted} style={{ transitionDelay: '300ms' }}>
                <Box sx={{ textAlign: 'center', mb: 5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <Box sx={{
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: -2,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #1E40AF, #3B82F6)',
                        opacity: 0.3,
                        zIndex: -1
                      }
                    }}>
                      <Box
                        component="img"
                        src="/5rings.jpg"
                        alt="5Rings Logo"
                        sx={{
                          height: 60,
                          width: 'auto',
                          filter: 'brightness(0) invert(1)'
                        }}
                      />
                    </Box>
                  </Box>

                  <Box sx={{ mt: 3, mb: 2 }}>
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        mb: 1,
                        fontWeight: 900,
                        fontSize: { xs: '1.75rem', sm: '2.25rem' },
                        background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      Welcome Back
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                      Sign in to your 5RINGS account
                    </Typography>
                  </Box>

                  {/* Feature highlights */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 3, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SportsSoccer sx={{ fontSize: 20, color: 'primary.main' }} />
                      <Typography variant="caption" color="text.secondary">Sports</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmojiEvents sx={{ fontSize: 20, color: 'primary.main' }} />
                      <Typography variant="caption" color="text.secondary">Events</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SecurityUpdate sx={{ fontSize: 20, color: 'primary.main' }} />
                      <Typography variant="caption" color="text.secondary">Secure</Typography>
                    </Box>
                  </Box>
                </Box>
              </Zoom>

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Fade in={mounted} style={{ transitionDelay: '600ms' }}>
                <Box>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    autoFocus
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: 'primary.main' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(30, 64, 175, 0.15)'
                        },
                        '&.Mui-focused': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(30, 64, 175, 0.25)'
                        }
                      }
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: 'primary.main' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(30, 64, 175, 0.15)'
                        },
                        '&.Mui-focused': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(30, 64, 175, 0.25)'
                        }
                      }
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{ 
                      mb: 2, 
                      py: 1.8,
                      fontSize: '1.1rem',
                      textTransform: 'none',
                      fontWeight: 700,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(30, 64, 175, 0.3)'
                      },
                      '&.Mui-disabled': {
                        background: 'rgba(30, 64, 175, 0.6)'
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {loading ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CircularProgress size={20} sx={{ color: '#FFFFFF' }} />
                        <Typography variant="button">Signing in...</Typography>
                      </Box>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </Box>
              </Fade>

              <Fade in={mounted} style={{ transitionDelay: '800ms' }}>
                <Box>
                  <Divider sx={{ my: 3 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                      OR CONTINUE WITH
                    </Typography>
                  </Divider>

                  {/* Social Login Buttons */}
                  <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Google />}
                      sx={{
                        py: 1.5,
                        borderColor: 'rgba(0, 0, 0, 0.12)',
                        color: 'text.primary',
                        '&:hover': {
                          borderColor: 'rgba(0, 0, 0, 0.2)',
                          bgcolor: 'rgba(0, 0, 0, 0.02)',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Google
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Facebook />}
                      sx={{
                        py: 1.5,
                        borderColor: 'rgba(0, 0, 0, 0.12)',
                        color: 'text.primary',
                        '&:hover': {
                          borderColor: 'rgba(0, 0, 0, 0.2)',
                          bgcolor: 'rgba(0, 0, 0, 0.02)',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Facebook
                    </Button>
                  </Box>

                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      New to 5RINGS?{' '}
                      <Link
                        component={RouterLink}
                        to="/register"
                        sx={{
                          color: 'primary.main',
                          fontWeight: 700,
                          textDecoration: 'none',
                          transition: 'all 0.2s',
                          '&:hover': {
                            textDecoration: 'underline',
                            color: 'primary.dark',
                          },
                        }}
                      >
                        Create Account
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </Fade>
            </Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>

    <Dialog 
      open={showOTPDialog} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: { background: 'transparent', boxShadow: 'none' }
      }}
    >
      <VerifyOTP 
        email={unverifiedEmail} 
        name={formData.name || 'User'} 
        onVerified={handleOTPVerified} 
      />
    </Dialog>
    </>
  );
};

export default Login;
