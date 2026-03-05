import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Inventory as InventoryIcon,
} from '@mui/icons-material';
import api from '../../utils/api';

function VendorDashboard() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'snacks',
    price: '',
    nutrition: {
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
    },
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isAvailable: true,
  });

  useEffect(() => {
    loadMenu();
    loadOrders();
  }, []);

  const loadMenu = async () => {
    try {
      const response = await api.get('/vendor/menu');
      setMenuItems(response.data.menuItems);
    } catch (error) {
      console.error('Failed to load menu:', error);
    }
  };

  const loadOrders = async () => {
    try {
      const response = await api.get('/vendor/orders');
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Failed to load orders:', error);
    }
  };

  const handleSaveMenuItem = async () => {
    try {
      if (currentItem) {
        await api.put(`/menu/${currentItem._id}`, formData);
      } else {
        await api.post('/menu', formData);
      }
      setOpenDialog(false);
      loadMenu();
      resetForm();
    } catch (error) {
      console.error('Failed to save menu item:', error);
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      loadOrders();
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const resetForm = () => {
    setCurrentItem(null);
    setFormData({
      name: '',
      description: '',
      category: 'snacks',
      price: '',
      nutrition: {
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
      },
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, bgcolor: '#FAFAFA', minHeight: '100vh', pt: 4 }}>
      {/* Welcome Board */}
      <Card
        elevation={0}
        sx={{
          mb: 4,
          bgcolor: '#1a1a1a',
          color: 'white',
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>
                Vendor Dashboard 🛍️
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Manage your menu items and orders
              </Typography>
            </Box>
            {/* Role Badge */}
            <Chip
              label="VENDOR"
              sx={{
                bgcolor: 'white',
                color: '#1a1a1a',
                fontWeight: 700,
                fontSize: '0.9rem',
                px: 2,
                py: 3,
              }}
            />
          </Box>
        </CardContent>
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            bgcolor: 'rgba(255, 255, 255, 0.05)',
          }}
        />
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
          Dashboard Overview
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<InventoryIcon />}
            onClick={() => navigate('/vendor/products')}
            sx={{
              borderColor: '#1a1a1a',
              borderWidth: 2,
              color: '#1a1a1a',
              textTransform: 'none',
              px: 2,
              borderRadius: 2,
              '&:hover': {
                borderWidth: 2,
                borderColor: '#1a1a1a',
                bgcolor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            Manage Products
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              resetForm();
              setOpenDialog(true);
            }}
            sx={{
              bgcolor: '#1a1a1a',
              color: 'white',
              textTransform: 'none',
              px: 3,
              borderRadius: 2,
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#2a2a2a',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            Add Menu Item
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card elevation={0} sx={{ bgcolor: 'white', border: '1px solid', borderColor: 'rgba(0, 0, 0, 0.08)', borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 1, fontWeight: 600 }}>
                Menu Items
              </Typography>
              <Typography variant="h3" sx={{ color: '#1a1a1a', fontWeight: 900 }}>
                {menuItems.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card elevation={0} sx={{ bgcolor: 'white', border: '1px solid', borderColor: 'rgba(0, 0, 0, 0.08)', borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 1, fontWeight: 600 }}>
                Active Orders
              </Typography>
              <Typography variant="h3" sx={{ color: '#1a1a1a', fontWeight: 900 }}>
                {orders.filter((o) => o.status === 'placed' || o.status === 'preparing').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card elevation={0} sx={{ bgcolor: 'white', border: '1px solid', borderColor: 'rgba(0, 0, 0, 0.08)', borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 1, fontWeight: 600 }}>
                Completed Today
              </Typography>
              <Typography variant="h3" sx={{ color: '#1a1a1a', fontWeight: 900 }}>
                {
                  orders.filter(
                    (o) =>
                      o.status === 'delivered' &&
                      new Date(o.deliveredAt).toDateString() === new Date().toDateString()
                  ).length
                }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card elevation={0} sx={{ bgcolor: 'white', border: '1px solid', borderColor: 'rgba(0, 0, 0, 0.08)', borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 1, fontWeight: 600 }}>
                Total Revenue
              </Typography>
              <Typography variant="h3" sx={{ color: '#1a1a1a', fontWeight: 900 }}>
                $
                {orders
                  .filter((o) => o.status === 'delivered')
                  .reduce((sum, o) => sum + o.totalAmount, 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper elevation={0} sx={{ width: '100%', mb: 2, bgcolor: 'white', border: '1px solid', borderColor: 'rgba(0, 0, 0, 0.08)', borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{
            borderBottom: 1,
            borderColor: 'rgba(0, 0, 0, 0.08)',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              color: '#666',
              '&.Mui-selected': {
                color: '#1a1a1a',
              },
            },
            '& .MuiTabs-indicator': {
              bgcolor: '#1a1a1a',
              height: 3,
            },
          }}
        >
          <Tab label="Menu Items" />
          <Tab label="Active Orders" />
          <Tab label="Order History" />
        </Tabs>

        {tabValue === 0 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#FAFAFA' }}>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Category</strong></TableCell>
                  <TableCell><strong>Price</strong></TableCell>
                  <TableCell><strong>Calories</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {menuItems.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell>{item.nutrition?.calories || 'N/A'}</TableCell>
                    <TableCell>
                      <Chip
                        label={item.isAvailable ? 'Available' : 'Unavailable'}
                        color={item.isAvailable ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => {
                          setCurrentItem(item);
                          setFormData(item);
                          setOpenDialog(true);
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {(tabValue === 1 || tabValue === 2) && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#F8FAFC' }}>
                  <TableCell><strong>Order ID</strong></TableCell>
                  <TableCell><strong>Customer</strong></TableCell>
                  <TableCell><strong>Items</strong></TableCell>
                  <TableCell><strong>Total</strong></TableCell>
                  <TableCell><strong>Delivery Location</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders
                  .filter((order) =>
                    tabValue === 1
                      ? ['placed', 'preparing', 'ready'].includes(order.status)
                      : ['delivered', 'cancelled'].includes(order.status)
                  )
                  .map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>{order._id.slice(-6)}</TableCell>
                      <TableCell>{order.user?.name}</TableCell>
                      <TableCell>{order.items.length} items</TableCell>
                      <TableCell>${order.totalAmount}</TableCell>
                      <TableCell>{order.deliveryLocation?.seatNumber}</TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          color={
                            order.status === 'delivered'
                              ? 'success'
                              : order.status === 'cancelled'
                              ? 'error'
                              : 'warning'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {order.status === 'placed' && (
                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => handleUpdateOrderStatus(order._id, 'preparing')}
                            sx={{ bgcolor: '#1E40AF', mr: 1 }}
                          >
                            Accept
                          </Button>
                        )}
                        {order.status === 'preparing' && (
                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => handleUpdateOrderStatus(order._id, 'ready')}
                            sx={{ bgcolor: '#10B981', mr: 1 }}
                          >
                            Ready
                          </Button>
                        )}
                        {order.status === 'ready' && (
                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => handleUpdateOrderStatus(order._id, 'delivered')}
                            sx={{ bgcolor: '#059669' }}
                          >
                            Delivered
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{currentItem ? 'Edit Menu Item' : 'Add Menu Item'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Item Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                SelectProps={{ native: true }}
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snacks">Snacks</option>
                <option value="beverages">Beverages</option>
                <option value="dessert">Dessert</option>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Price ($)"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Calories"
                value={formData.nutrition?.calories || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    nutrition: { ...formData.nutrition, calories: e.target.value },
                  })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Protein (g)"
                value={formData.nutrition?.protein || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    nutrition: { ...formData.nutrition, protein: e.target.value },
                  })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isVegetarian}
                    onChange={(e) =>
                      setFormData({ ...formData, isVegetarian: e.target.checked })
                    }
                  />
                }
                label="Vegetarian"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isVegan}
                    onChange={(e) => setFormData({ ...formData, isVegan: e.target.checked })}
                  />
                }
                label="Vegan"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isGlutenFree}
                    onChange={(e) =>
                      setFormData({ ...formData, isGlutenFree: e.target.checked })
                    }
                  />
                }
                label="Gluten Free"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isAvailable}
                    onChange={(e) =>
                      setFormData({ ...formData, isAvailable: e.target.checked })
                    }
                  />
                }
                label="Available"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveMenuItem} sx={{ bgcolor: '#1E40AF' }}>
            {currentItem ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default VendorDashboard;
