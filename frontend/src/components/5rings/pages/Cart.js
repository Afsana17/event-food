import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Button,
  TextField,
  Paper,
  Divider,
  Alert
} from '@mui/material';
import Layout from '../components/Layout.js';
import { useCart } from '../../../context/CartContext';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [showCheckoutMessage, setShowCheckoutMessage] = useState(false);
  const navigate = useNavigate();

  const formatINR = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`;

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token) {
      // Redirect to login if not logged in
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    const user = userStr ? JSON.parse(userStr) : null;

    // Show success message
    setShowCheckoutMessage(true);
    
    setTimeout(() => {
      clearCart();
      
      // Redirect based on user role
      if (user.role === 'vendor') {
        navigate('/dashboard');
      } else if (user.role === 'admin') {
        navigate('/dashboard');
      } else if (user.role === 'coach') {
        navigate('/dashboard');
      } else if (user.role === 'event_organizer') {
        navigate('/dashboard');
      } else {
        // Regular user
        navigate('/dashboard');
      }
    }, 2000);
  };

  return (
    <Layout>
      <Box sx={{ pt: 12, bgcolor: '#FAFAFA', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ color: '#1a1a1a' }}>
            Shopping Cart
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Review your items and proceed to checkout.
          </Typography>
        </Box>

        {showCheckoutMessage && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Order placed successfully! Redirecting to dashboard...
          </Alert>
        )}

        {cartItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Your cart is empty
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/products')}
              sx={{ mt: 2 }}
            >
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            {/* Cart Items */}
            <Box sx={{ flex: 2 }}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <List>
                  {cartItems.map((item, index) => (
                    <React.Fragment key={item._id}>
                      <ListItem
                        alignItems="flex-start"
                        sx={{
                          flexDirection: { xs: 'column', sm: 'row' },
                          gap: 2
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            variant="rounded"
                            src={item.image || item.images?.[0] || ''}
                            alt={item.name}
                            sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}
                          >
                            {item.name.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="h6">
                              {item.name}
                            </Typography>
                          }
                          secondary={
                            <>
                              <Typography variant="body2" color="text.secondary">
                                {item.description?.substring(0, 100)}...
                              </Typography>
                              <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                                {formatINR(item.price)}
                              </Typography>
                            </>
                          }
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: { xs: '100%', sm: 'auto' }, justifyContent: { xs: 'space-between', sm: 'flex-end' } }}>
                          <IconButton
                            size="small"
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <TextField
                            size="small"
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item._id, parseInt(e.target.value) || 1)}
                            sx={{ width: 60 }}
                            inputProps={{ min: 1, max: item.stock }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                          >
                            <AddIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => removeFromCart(item._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </ListItem>
                      {index < cartItems.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Box>

            {/* Order Summary */}
            <Box sx={{ flex: 1 }}>
              <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 96 }}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Order Summary
                </Typography>
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ mb: 2 }}>
                  {cartItems.map((item) => (
                    <Box
                      key={item._id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1
                      }}
                    >
                      <Typography variant="body2">
                        {item.name} x {item.quantity}
                      </Typography>
                      <Typography variant="body2">
                        {formatINR(item.price * item.quantity)}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" fontWeight="bold">
                    Total:
                  </Typography>
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    {formatINR(getCartTotal())}
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCartCheckoutIcon />}
                  onClick={handleCheckout}
                  sx={{ textTransform: 'none' }}
                >
                  Checkout
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 2, textTransform: 'none' }}
                  onClick={() => navigate('/products')}
                >
                  Continue Shopping
                </Button>
              </Paper>
            </Box>
          </Box>
        )}
      </Container>
      </Box>
    </Layout>
  );
};

export default Cart;
