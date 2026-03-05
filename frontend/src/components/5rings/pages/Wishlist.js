import React, { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Stack,
  IconButton,
  Divider,
  Chip,
  CircularProgress,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Layout from '../components/Layout';
import { useCart } from '../../../context/CartContext';

const Wishlist = () => {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      try {
        setWishlistIds(JSON.parse(saved));
      } catch {
        setWishlistIds([]);
      }
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data?.data || []);
      } catch (error) {
        console.error('Error fetching wishlist products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const wishlistProducts = useMemo(
    () => products.filter((product) => wishlistIds.includes(product._id)),
    [products, wishlistIds]
  );

  const removeFromWishlist = (productId) => {
    const updated = wishlistIds.filter((id) => id !== productId);
    setWishlistIds(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: { xs: 10, md: 12 } }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2} sx={{ mb: 4 }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 800, color: '#1a1a1a', mb: 1 }}>
              My Wishlist
            </Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              {wishlistProducts.length} item{wishlistProducts.length === 1 ? '' : 's'} saved
            </Typography>
          </Box>

          <Button component={RouterLink} to="/products" variant="outlined" sx={{ textTransform: 'none', borderColor: '#1a1a1a', color: '#1a1a1a' }}>
            Continue Shopping
          </Button>
        </Stack>

        <Divider sx={{ mb: 4 }} />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress />
          </Box>
        ) : wishlistProducts.length === 0 ? (
          <Card sx={{ borderRadius: 3, textAlign: 'center', py: 8 }}>
            <CardContent>
              <FavoriteIcon sx={{ fontSize: 52, color: '#e91e63', mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                Your wishlist is empty
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 3 }}>
                Save products you like and they will appear here.
              </Typography>
              <Button component={RouterLink} to="/products" variant="contained" sx={{ textTransform: 'none', bgcolor: '#1a1a1a' }}>
                Browse Products
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
                lg: 'repeat(3, minmax(0, 1fr))',
              },
              gap: 3,
            }}
          >
            {wishlistProducts.map((product) => (
              <Card key={product._id} sx={{ borderRadius: 3, display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  image={product.image || '/5rings.jpg'}
                  alt={product.name}
                  sx={{ height: 220, objectFit: 'cover' }}
                />

                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      {product.description || 'Premium sports product'}
                    </Typography>
                  </Box>

                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      ₹{product.price}
                    </Typography>
                    <Chip label={product.stock > 0 ? 'In Stock' : 'Out of Stock'} color={product.stock > 0 ? 'success' : 'default'} size="small" />
                  </Stack>

                  <Stack direction="row" spacing={1} sx={{ mt: 'auto' }}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<ShoppingCartIcon />}
                      disabled={product.stock <= 0}
                      onClick={() => addToCart(product)}
                      sx={{ textTransform: 'none', bgcolor: '#1a1a1a' }}
                    >
                      Add to Cart
                    </Button>
                    <IconButton
                      color="error"
                      onClick={() => removeFromWishlist(product._id)}
                      aria-label="remove from wishlist"
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </Layout>
  );
};

export default Wishlist;
