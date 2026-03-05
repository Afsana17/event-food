import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Container,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  alpha,
  Tooltip,
  Zoom,
  TextField,
  InputAdornment,
  Collapse,
  Chip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { useCart } from '../../../context/CartContext';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userStr));
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDashboard = () => {
    handleUserMenuClose();
    navigate('/dashboard');
  };

  const handleLogout = () => {
    handleUserMenuClose();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNotificationOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setSearchQuery('');
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const notifications = [
    { id: 1, text: 'New cricket tournament registration open', time: '2 hours ago', unread: true },
    { id: 2, text: 'Your booking for tennis court confirmed', time: '1 day ago', unread: false },
    { id: 3, text: 'Special discount on sports equipment', time: '3 days ago', unread: false }
  ];

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'About', path: '/about' },
    { text: 'Sports', path: '/sports' },
    { text: 'Events', path: '/events' },
    { text: 'Food', path: '/products' },
    { text: 'Services', path: '/services' },
    { text: 'Gallery', path: '/gallery' },
    { text: 'Contact', path: '/contact' }
  ];

  const drawer = (
    <Box sx={{ width: 280, height: '100%', bgcolor: 'white' }}>
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'rgba(0, 0, 0, 0.08)' }}>
        <Box component="img" src="/5rings.jpg" alt="5Rings" sx={{ height: 45 }} />
        <IconButton onClick={handleDrawerToggle} sx={{ color: '#1a1a1a' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ px: 2, py: 3 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            component={RouterLink}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              color: '#1a1a1a',
              borderRadius: 2,
              mb: 0.5,
              '&:hover': {
                bgcolor: alpha('#1a1a1a', 0.04)
              },
              transition: 'all 0.3s ease'
            }}
          >
            <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 500 }} />
          </ListItem>
        ))}
      </List>
      {isLoggedIn && (
        <Box sx={{ px: 2, mt: 'auto', pt: 2, borderTop: '1px solid', borderColor: 'rgba(0, 0, 0, 0.08)' }}>
          <Button
            fullWidth
            startIcon={<DashboardIcon />}
            onClick={() => { handleDrawerToggle(); navigate('/dashboard'); }}
            sx={{ color: '#1a1a1a', justifyContent: 'flex-start', mb: 1, textTransform: 'none', fontWeight: 500 }}
          >
            Dashboard
          </Button>
          <Button
            fullWidth
            startIcon={<LogoutIcon />}
            onClick={() => { handleDrawerToggle(); handleLogout(); }}
            sx={{ color: '#d32f2f', justifyContent: 'flex-start', textTransform: 'none', fontWeight: 500 }}
          >
            Logout
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 1 : 0}
        sx={{
          bgcolor: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid',
          borderColor: scrolled ? 'rgba(0, 0, 0, 0.08)' : 'rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: scrolled ? '0 2px 20px rgba(0, 0, 0, 0.05)' : 'none'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ px: { xs: 0, sm: 2 } }}>
            <Box
              component={RouterLink}
              to="/"
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                textDecoration: 'none', 
                mr: 'auto',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <Box component="img" src="/5rings.jpg" alt="5Rings" sx={{ height: { xs: 45, md: 50 }, mr: 2 }} />
              <Typography
                variant="h5"
                fontWeight={800}
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  color: '#1a1a1a',
                  letterSpacing: 0.5,
                  fontSize: '1.5rem'
                }}
              >
                5RINGS
              </Typography>
            </Box>

            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      color: '#1a1a1a',
                      textTransform: 'none',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      px: 2.5,
                      py: 1,
                      borderRadius: 2,
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 8,
                        left: '50%',
                        transform: 'translateX(-50%) scaleX(0)',
                        width: '60%',
                        height: 2,
                        bgcolor: '#1a1a1a',
                        transition: 'transform 0.3s ease',
                        borderRadius: 2
                      },
                      '&:hover': {
                        bgcolor: alpha('#1a1a1a', 0.04),
                        '&::after': {
                          transform: 'translateX(-50%) scaleX(1)'
                        }
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 3 }}>
              {/* Search Toggle */}
              <Tooltip title="Search" TransitionComponent={Zoom}>
                <IconButton
                  onClick={handleSearchToggle}
                  sx={{ 
                    color: '#1a1a1a',
                    '&:hover': { 
                      bgcolor: alpha('#1a1a1a', 0.04),
                      transform: 'scale(1.05)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </Tooltip>

              {/* Wishlist */}
              {isLoggedIn && (
                <Tooltip title="Wishlist" TransitionComponent={Zoom}>
                  <IconButton
                    component={RouterLink}
                    to="/wishlist"
                    sx={{ 
                      color: '#1a1a1a',
                      '&:hover': { 
                        bgcolor: alpha('#1a1a1a', 0.04),
                        transform: 'scale(1.05)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Badge badgeContent={0} sx={{ '& .MuiBadge-badge': { bgcolor: '#e91e63', color: '#fff', fontWeight: 600 } }}>
                      <FavoriteIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              )}

              {/* Cart */}
              <Tooltip title="Shopping Cart" TransitionComponent={Zoom}>
                <IconButton
                  component={RouterLink}
                  to="/cart"
                  sx={{ 
                    color: '#1a1a1a',
                    '&:hover': { 
                      bgcolor: alpha('#1a1a1a', 0.04),
                      transform: 'scale(1.05)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Badge badgeContent={getCartCount()} sx={{ '& .MuiBadge-badge': { bgcolor: '#1a1a1a', color: '#fff', fontWeight: 600 } }}>
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* Notifications */}
              {isLoggedIn && (
                <>
                  <Tooltip title="Notifications" TransitionComponent={Zoom}>
                    <IconButton
                      onClick={handleNotificationOpen}
                      sx={{ 
                        color: '#1a1a1a',
                        '&:hover': { 
                          bgcolor: alpha('#1a1a1a', 0.04),
                          transform: 'scale(1.05)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <Badge badgeContent={notifications.filter(n => n.unread).length} sx={{ '& .MuiBadge-badge': { bgcolor: '#f44336', color: '#fff', fontWeight: 600 } }}>
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                  
                  <Menu
                    anchorEl={notificationAnchor}
                    open={Boolean(notificationAnchor)}
                    onClose={handleNotificationClose}
                    PaperProps={{
                      sx: {
                        bgcolor: 'white',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                        borderRadius: 2,
                        mt: 1.5,
                        minWidth: 320,
                        maxHeight: 400,
                        overflowY: 'auto'
                      }
                    }}
                  >
                    <Box sx={{ p: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
                      <Typography variant="h6" fontWeight={600}>
                        Notifications
                      </Typography>
                    </Box>
                    {notifications.map((notification) => (
                      <MenuItem key={notification.id} onClick={handleNotificationClose} sx={{ 
                        py: 2, 
                        px: 2.5, 
                        flexDirection: 'column', 
                        alignItems: 'flex-start',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                        bgcolor: notification.unread ? alpha('#2196f3', 0.05) : 'transparent',
                        '&:hover': { bgcolor: alpha('#1a1a1a', 0.04) } 
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 0.5 }}>
                          <Typography variant="body2" sx={{ flex: 1, fontWeight: notification.unread ? 600 : 400 }}>
                            {notification.text}
                          </Typography>
                          {notification.unread && (
                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#2196f3', ml: 1 }} />
                          )}
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {notification.time}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )}

              {isLoggedIn ? (
                <>
                  <Tooltip title={user?.name || "User Menu"} TransitionComponent={Zoom}>
                    <IconButton onClick={handleUserMenuOpen} sx={{ p: 0.5 }}>
                      <Avatar sx={{ 
                        width: 40, 
                        height: 40, 
                        bgcolor: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)', 
                        color: '#fff', 
                        fontWeight: 700,
                        border: '2px solid',
                        borderColor: 'rgba(26, 26, 26, 0.1)',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          borderColor: '#1a1a1a'
                        },
                        transition: 'all 0.3s ease'
                      }}>
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleUserMenuClose}
                    PaperProps={{
                      sx: {
                        bgcolor: 'white',
                        color: '#1a1a1a',
                        border: '1px solid',
                        borderColor: 'rgba(0, 0, 0, 0.08)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                        borderRadius: 2,
                        mt: 1.5,
                        minWidth: 240,
                        overflow: 'visible',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'white',
                          border: '1px solid rgba(0, 0, 0, 0.08)',
                          borderRadius: '2px',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0
                        }
                      }
                    }}
                  >
                    <Box sx={{ px: 3, py: 2.5, borderBottom: '1px solid', borderColor: 'rgba(0, 0, 0, 0.08)' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: '#1a1a1a', mr: 2 }}>
                          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" fontWeight={700}>{user?.name}</Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                            {user?.email}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                        <Chip
                          icon={<PersonIcon sx={{ fontSize: 16 }} />}
                          label={user?.role?.toUpperCase() || 'USER'}
                          size="small"
                          sx={{
                            bgcolor: alpha('#1a1a1a', 0.1),
                            color: '#1a1a1a',
                            fontWeight: 600,
                            fontSize: '0.7rem'
                          }}
                        />
                      </Box>
                    </Box>
                    
                    <MenuItem onClick={handleDashboard} sx={{ py: 1.5, px: 3, '&:hover': { bgcolor: alpha('#1a1a1a', 0.04) } }}>
                      <DashboardIcon sx={{ mr: 2, fontSize: 20, color: '#1a1a1a' }} />
                      <Typography variant="body2" fontWeight={500}>Dashboard</Typography>
                    </MenuItem>
                    
                    <MenuItem onClick={handleUserMenuClose} component={RouterLink} to="/profile" sx={{ py: 1.5, px: 3, '&:hover': { bgcolor: alpha('#1a1a1a', 0.04) } }}>
                      <PersonIcon sx={{ mr: 2, fontSize: 20, color: '#1a1a1a' }} />
                      <Typography variant="body2" fontWeight={500}>Profile Settings</Typography>
                    </MenuItem>
                    
                    <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.08)' }} />
                    
                    <MenuItem onClick={handleLogout} sx={{ py: 1.5, px: 3, color: '#d32f2f', '&:hover': { bgcolor: alpha('#d32f2f', 0.04) } }}>
                      <LogoutIcon sx={{ mr: 2, fontSize: 20 }} />
                      <Typography variant="body2" fontWeight={500}>Logout</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="contained"
                  startIcon={<AccountCircleIcon />}
                  sx={{
                    bgcolor: '#1a1a1a',
                    color: '#fff',
                    fontWeight: 600,
                    textTransform: 'none',
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    boxShadow: 'none',
                    '&:hover': { 
                      bgcolor: '#2a2a2a',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      transform: 'translateY(-2px)'
                    },
                    display: { xs: 'none', sm: 'flex' },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  Login
                </Button>
              )}

              {isMobile && (
                <IconButton onClick={handleDrawerToggle} sx={{ color: '#1a1a1a', ml: 1 }}>
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            bgcolor: 'white',
            boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.08)'
          }
        }}
      >
        {drawer}
      </Drawer>

      {/* Search Overlay */}
      <Collapse in={searchOpen}>
        <Box sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1300,
          bgcolor: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          pt: { xs: 8, md: 10 },
          pb: 4
        }}>
          <Container maxWidth="md">
            <Box component="form" onSubmit={handleSearchSubmit}>
              <TextField
                fullWidth
                autoFocus
                placeholder="Search for sports, events, food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleSearchToggle} size="small">
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'white',
                    borderRadius: 3,
                    fontSize: '1.1rem',
                    '& fieldset': {
                      borderColor: 'rgba(0, 0, 0, 0.1)'
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(0, 0, 0, 0.2)'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1a1a1a'
                    }
                  }
                }}
              />
            </Box>
            
            <Box sx={{ mt: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                Popular searches:
              </Typography>
              {['Football', 'Cricket', 'Tennis', 'Events', 'Equipment'].map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  onClick={() => {
                    setSearchQuery(tag);
                    handleSearchSubmit({ preventDefault: () => {} });
                  }}
                  sx={{
                    bgcolor: alpha('#1a1a1a', 0.05),
                    '&:hover': {
                      bgcolor: alpha('#1a1a1a', 0.1)
                    },
                    cursor: 'pointer'
                  }}
                />
              ))}
            </Box>
          </Container>
        </Box>
      </Collapse>
    </>
  );
};

export default Navbar;
