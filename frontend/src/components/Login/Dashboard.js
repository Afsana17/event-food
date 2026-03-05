import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Grid,
  Paper,
  AppBar,
  Toolbar,
  CircularProgress,
} from '@mui/material';
import {
  Logout,
  Person,
  Email,
  Verified,
  CalendarToday,
  School,
  Home,
} from '@mui/icons-material';
import { authAPI } from '../../utils/api';
import EventOrganizerDashboard from '../dashboards/EventOrganizerDashboard';
import VendorDashboard from '../dashboards/VendorDashboard';
import CoachDashboard from '../dashboards/CoachDashboard';
import AdminDashboard from '../dashboards/AdminDashboard';
import UserDashboard from '../dashboards/UserDashboard';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      
      // Verify token with backend
      const response = await authAPI.getMe();
      if (response.data.success) {
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #BFDBFE 100%)',
        }}
      >
        <CircularProgress size={60} sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  // Redirect to role-specific dashboard
  if (user) {
    if (user.role === 'admin') {
      return (
        <>
          <AppBar position="static" elevation={0}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
                5Rings Sport Platform - Admin
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Home />}
                onClick={() => navigate('/')}
                sx={{ borderColor: 'white', color: 'white', mr: 2 }}
              >
                Home
              </Button>
              <Button
                variant="outlined"
                startIcon={<Logout />}
                onClick={handleLogout}
                sx={{ borderColor: 'white', color: 'white' }}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>
          <AdminDashboard />
        </>
      );
    }

    if (user.role === 'event_organizer') {
      return (
        <>
          <AppBar position="static" elevation={0}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
                5Rings Sport Platform - Event Organizer
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Home />}
                onClick={() => navigate('/')}
                sx={{ borderColor: 'white', color: 'white', mr: 2 }}
              >
                Home
              </Button>
              <Button
                variant="outlined"
                startIcon={<Logout />}
                onClick={handleLogout}
                sx={{ borderColor: 'white', color: 'white' }}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>
          <EventOrganizerDashboard />
        </>
      );
    }

    if (user.role === 'vendor') {
      return (
        <>
          <AppBar position="static" elevation={0}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
                5Rings Sport Platform - Vendor
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Home />}
                onClick={() => navigate('/')}
                sx={{ borderColor: 'white', color: 'white', mr: 2 }}
              >
                Home
              </Button>
              <Button
                variant="outlined"
                startIcon={<Logout />}
                onClick={handleLogout}
                sx={{ borderColor: 'white', color: 'white' }}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>
          <VendorDashboard />
        </>
      );
    }

    if (user.role === 'coach') {
      return (
        <>
          <AppBar position="static" elevation={0}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
                5Rings Sport Platform - Coach
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Home />}
                onClick={() => navigate('/')}
                sx={{ borderColor: 'white', color: 'white', mr: 2 }}
              >
                Home
              </Button>
              <Button
                variant="outlined"
                startIcon={<Logout />}
                onClick={handleLogout}
                sx={{ borderColor: 'white', color: 'white' }}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>
          <CoachDashboard />
        </>
      );
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #F8FAFC 100%)',
        pb: 4,
      }}
    >
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            5Rings Sport Platform
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Home />}
            onClick={() => navigate('/')}
            sx={{ borderColor: 'white', color: 'white', mr: 2 }}
          >
            Home
          </Button>
          <Button
            variant="outlined"
            startIcon={<Logout />}
            onClick={handleLogout}
            sx={{ borderColor: 'white', color: 'white' }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <UserDashboard user={user} />
    </Box>
  );
};

export default Dashboard;