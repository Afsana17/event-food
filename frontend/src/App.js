import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import sportTheme from './theme/sportTheme';
import { CartProvider } from './context/CartContext';

// 5Rings Public Pages
import Index from './components/5rings/pages/Home';
import About from './components/5rings/pages/About';
import Services from './components/5rings/pages/Services';
import Sports from './components/5rings/pages/Sports';
import Gallery from './components/5rings/pages/Gallery';
import Contact from './components/5rings/pages/Contact';
import Products from './components/5rings/pages/Products';
import Wishlist from './components/5rings/pages/Wishlist';
import Events from './components/5rings/pages/Events';
import Cart from './components/5rings/pages/Cart';
import NotFound from './components/5rings/pages/NotFound';

// Auth & Dashboard Pages
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import Dashboard from './components/Login/Dashboard';
import AdminSetup from './components/Admin/AdminSetup';
import ProtectedRoute from './components/Login/ProtectedRoute';

// Vendor Pages
import VendorProducts from './components/Vendor/VendorProducts';

function App() {
  return (
    <ThemeProvider theme={sportTheme}>
      <CssBaseline />
      <CartProvider>
        <Router>
          <Routes>
            {/* Public 5Rings Pages */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/sports" element={<Sports />} />
            <Route path="/products" element={<Products />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/events" element={<Events />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-setup" element={<AdminSetup />} />
            
            {/* Protected Dashboard Route */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />

            {/* Vendor Routes */}
            <Route 
              path="/vendor/products" 
              element={
                <ProtectedRoute>
                  <VendorProducts />
                </ProtectedRoute>
              } 
            />
            
            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;

