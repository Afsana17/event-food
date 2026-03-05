import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  IconButton,
  LinearProgress,
  Fade,
  Zoom,
  alpha,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ShoppingBag,
  ConfirmationNumber,
  EmojiEvents,
  Notifications,
  Visibility,
  ArrowForward,
  Star,
  LocationOn,
  CalendarToday,
  TrendingUp,
  LocalFireDepartment,
  Schedule,
  FavoriteBorder,
  Share,
  MoreVert,
} from '@mui/icons-material';
import api from '../../utils/api';
import axios from 'axios';

function UserDashboard({ user }) {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalTickets: 0,
    upcomingEvents: 0,
    recentProducts: 0,
  });
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [myTickets, setMyTickets] = useState([]);
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [activityFeed, setActivityFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setMounted(true);
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Load tickets
      const ticketsRes = await api.get('/tickets');
      const tickets = ticketsRes.data.tickets || [];
      setMyTickets(tickets.slice(0, 3));
      
      // Load recommended events
      const eventsRes = await axios.get('http://localhost:5000/api/events', {
        params: { status: 'published' }
      });
      setRecommendedEvents((eventsRes.data.events || []).slice(0, 4));

      // Load recently viewed products from localStorage
      const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
      setRecentlyViewed(viewed.slice(0, 6));

      // Generate activity feed
      const activities = [];
      
      tickets.slice(0, 3).forEach(ticket => {
        activities.push({
          type: 'ticket',
          title: `Booked ticket for ${ticket.event?.title || 'Event'}`,
          subtitle: ticket.category,
          time: ticket.bookingDate,
          icon: <ConfirmationNumber />,
          color: '#10B981',
        });
      });

      if (viewed.length > 0) {
        activities.push({
          type: 'view',
          title: `Viewed ${viewed[0].name}`,
          subtitle: 'Product',
          time: viewed[0].viewedAt || new Date().toISOString(),
          icon: <Visibility />,
          color: '#6366F1',
        });
      }

      setActivityFeed(activities.slice(0, 5));

      // Set stats
      setStats({
        totalOrders: 0,
        totalTickets: tickets.length,
        upcomingEvents: tickets.filter(t => new Date(t.event?.startDate) > new Date()).length,
        recentProducts: viewed.length,
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/products#${productId}`);
  };

  const handleEventClick = (eventId) => {
    navigate('/events');
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4, bgcolor: '#f8fafc', minHeight: '100vh', pt: 4 }}>
      {/* Welcome Board */}
      <Fade in={mounted} timeout={800}>
        <Card
          elevation={0}
          sx={{
            mb: 4,
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
            color: 'white',
            borderRadius: 4,
            overflow: 'hidden',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
              opacity: 0.6
            }
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 }, position: 'relative', zIndex: 2 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
              textAlign: { xs: 'center', md: 'left' }
            }}>
              <Box>
                <Typography variant="h3" sx={{ 
                  fontWeight: 900, 
                  mb: 1,
                  fontSize: { xs: '1.75rem', md: '2.25rem' }
                }}>
                  Welcome back, {user?.name?.split(' ')[0]}! 👋
                </Typography>
                <Typography variant="h6" sx={{ 
                  opacity: 0.9,
                  fontWeight: 400,
                  fontSize: { xs: '1rem', md: '1.1rem' }
                }}>
                  Here's what's happening with your account today
                </Typography>
                
                {/* Quick Stats Bar */}
                <Box sx={{ 
                  display: 'flex', 
                  gap: 4, 
                  mt: 3,
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  flexWrap: 'wrap'
                }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#10B981' }}>
                      {stats.totalTickets}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      Tickets
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#F59E0B' }}>
                      {stats.upcomingEvents}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      Upcoming
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#EF4444' }}>
                      {stats.recentProducts}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      Viewed
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              {/* User Profile Section */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ 
                  width: { xs: 60, md: 80 }, 
                  height: { xs: 60, md: 80 },
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  border: '3px solid rgba(255, 255, 255, 0.3)',
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  fontWeight: 700
                }}>
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </Avatar>
                <Chip
                  icon={<Star sx={{ fontSize: 16 }} />}
                  label="ATHLETE"
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    color: '#1a1a1a',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    px: 2,
                    py: 3,
                    '& .MuiChip-icon': {
                      color: '#F59E0B'
                    }
                  }}
                />
              </Box>
            </Box>
          </CardContent>
          
          {/* Decorative Elements */}
          <Box sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
          }} />
          <Box sx={{
            position: 'absolute',
            bottom: -30,
            left: -30,
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          }} />
        </Card>
      </Fade>

      {/* Enhanced Stats Cards */}
      <Zoom in={mounted} style={{ transitionDelay: '400ms' }}>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[
            {
              title: 'My Tickets',
              value: stats.totalTickets,
              subtitle: `${stats.upcomingEvents} upcoming`,
              icon: <ConfirmationNumber sx={{ fontSize: 28 }} />,
              color: '#10B981',
              bgColor: '#ECFDF5'
            },
            {
              title: 'Events Attended',
              value: stats.totalTickets - stats.upcomingEvents,
              subtitle: 'Completed events',
              icon: <EmojiEvents sx={{ fontSize: 28 }} />,
              color: '#F59E0B',
              bgColor: '#FFFBEB'
            },
            {
              title: 'Favorite Sports',
              value: '3',
              subtitle: 'Active interests',
              icon: <LocalFireDepartment sx={{ fontSize: 28 }} />,
              color: '#EF4444',
              bgColor: '#FEF2F2'
            },
            {
              title: 'Activity Score',
              value: Math.min(100, (stats.totalTickets * 20) + (stats.recentProducts * 5)),
              subtitle: 'Engagement level',
              icon: <TrendingUp sx={{ fontSize: 28 }} />,
              color: '#8B5CF6',
              bgColor: '#F3E8FF'
            }
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={stat.title}>
              <Card
                elevation={0}
                sx={{
                  bgcolor: 'white',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  borderRadius: 3,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
                    borderColor: stat.color
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="body2" sx={{ 
                        color: '#6B7280', 
                        mb: 1, 
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: 0.5
                      }}>
                        {stat.title}
                      </Typography>
                      <Typography variant="h3" sx={{ 
                        fontWeight: 900, 
                        mb: 1, 
                        color: '#111827',
                        fontSize: { xs: '1.75rem', md: '2rem' }
                      }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: stat.color,
                        fontWeight: 600
                      }}>
                        {stat.subtitle}
                      </Typography>
                    </Box>
                    <Box sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 3,
                      bgcolor: stat.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: stat.color
                    }}>
                      {stat.icon}
                    </Box>
                  </Box>
                  
                  {/* Progress Bar for Activity Score */}
                  {stat.title === 'Activity Score' && (
                    <Box sx={{ mt: 2 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={Math.min(100, stat.value)} 
                        sx={{ 
                          height: 6, 
                          borderRadius: 3,
                          bgcolor: alpha(stat.color, 0.1),
                          '& .MuiLinearProgress-bar': {
                            bgcolor: stat.color,
                            borderRadius: 3
                          }
                        }} 
                      />
                    </Box>
                  )}
                </CardContent>
                
                {/* Decorative gradient */}
                <Box sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: `linear-gradient(90deg, ${stat.color}, ${alpha(stat.color, 0.6)})`
                }} />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Zoom>

      {/* Main Content Grid */}
      <Grid container spacing={4}>
        {/* Main Content Area */}
        <Grid item xs={12} lg={8}>
          {/* My Tickets Section */}
          <Card elevation={0} sx={{ mb: 3, bgcolor: 'white', border: '1px solid', borderColor: 'rgba(0, 0, 0, 0.08)', borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                  🎟️ My Tickets
                </Typography>
                <Button
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/events')}
                  sx={{
                    textTransform: 'none',
                    color: '#1a1a1a',
                    fontWeight: 600,
                    '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' },
                  }}
                >
                  View All
                </Button>
              </Box>

              {myTickets.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <ConfirmationNumber sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    No tickets yet
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/events')}
                    sx={{
                      mt: 2,
                      bgcolor: '#1a1a1a',
                      color: 'white',
                      textTransform: 'none',
                      px: 3,
                      py: 1.2,
                      borderRadius: 2,
                      boxShadow: 'none',
                      '&:hover': {
                        bgcolor: '#2a2a2a',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      },
                    }}
                  >
                    Browse Events
                  </Button>
                </Box>
              ) : (
                <Grid container spacing={2}>
                  {myTickets.map((ticket) => (
                    <Grid item xs={12} key={ticket._id}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2.5,
                          border: '1px solid',
                          borderColor: 'rgba(0, 0, 0, 0.08)',
                          borderLeft: '4px solid #1a1a1a',
                          borderRadius: 2,
                          '&:hover': { boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)', borderColor: '#1a1a1a' },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                              {ticket.event?.title || 'Event'}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                              <Chip
                                label={ticket.category}
                                size="small"
                                sx={{
                                  bgcolor: 'rgba(0, 0, 0, 0.05)',
                                  color: '#1a1a1a',
                                  fontWeight: 600,
                                  borderRadius: 2,
                                }}
                              />
                              <Chip
                                label={ticket.status}
                                size="small"
                                sx={{
                                  bgcolor: ticket.status === 'booked' ? '#E8F5E9' : 'rgba(0, 0, 0, 0.05)',
                                  color: ticket.status === 'booked' ? '#2E7D32' : '#666',
                                  fontWeight: 600,
                                  borderRadius: 2,
                                }}
                              />
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  {ticket.event?.startDate
                                    ? new Date(ticket.event.startDate).toLocaleDateString()
                                    : 'TBA'}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  {ticket.event?.venue?.name || 'Venue TBA'}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="h6" sx={{ fontWeight: 900, color: '#1a1a1a' }}>
                              ${ticket.price}
                            </Typography>
                            {ticket.seatNumber && (
                              <Typography variant="caption" color="text.secondary">
                                Seat: {ticket.seatNumber}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              )}
            </CardContent>
          </Card>

          {/* Recently Viewed Products */}
          <Card elevation={0} sx={{ bgcolor: 'white', border: '1px solid', borderColor: 'rgba(0, 0, 0, 0.08)', borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                  👀 Recently Viewed Products
                </Typography>
                <Button
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/products')}
                  sx={{
                    textTransform: 'none',
                    color: '#1a1a1a',
                    fontWeight: 600,
                    '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' },
                  }}
                >
                  Browse More
                </Button>
              </Box>

              {recentlyViewed.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <ShoppingBag sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    No products viewed yet
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/products')}
                    sx={{
                      mt: 2,
                      bgcolor: '#1a1a1a',
                      color: 'white',
                      textTransform: 'none',
                      px: 3,
                      py: 1.2,
                      borderRadius: 2,
                      boxShadow: 'none',
                      '&:hover': {
                        bgcolor: '#2a2a2a',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      },
                    }}
                  >
                    Browse Products
                  </Button>
                </Box>
              ) : (
                <Grid container spacing={2}>
                  {recentlyViewed.map((product, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card
                        elevation={0}
                        sx={{
                          cursor: 'pointer',
                          border: '1px solid',
                          borderColor: 'rgba(0, 0, 0, 0.08)',
                          borderRadius: 2,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                            borderColor: '#1a1a1a',
                          },
                        }}
                        onClick={() => handleProductClick(product.id)}
                      >
                        <CardMedia
                          component="img"
                          height="140"
                          image={product.image || 'https://via.placeholder.com/300x200?text=Product'}
                          alt={product.name}
                        />
                        <CardContent>
                          <Typography variant="subtitle2" noWrap sx={{ fontWeight: 600 }}>
                            {product.name}
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 900, mt: 0.5, color: '#1a1a1a' }}>
                            ${product.price}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} lg={4}>
          {/* Activity Feed */}
          <Card elevation={0} sx={{ mb: 3, bgcolor: 'white', border: '1px solid', borderColor: 'rgba(0, 0, 0, 0.08)', borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a' }}>
                📊 Recent Activity
              </Typography>

              {activityFeed.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    No recent activity
                  </Typography>
                </Box>
              ) : (
                <List sx={{ p: 0 }}>
                  {activityFeed.map((activity, index) => (
                    <React.Fragment key={index}>
                      <ListItem sx={{ px: 0, py: 1.5 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: '#1a1a1a', width: 40, height: 40 }}>
                            {activity.icon}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {activity.title}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="caption" color="text.secondary">
                              {activity.subtitle} • {new Date(activity.time).toLocaleDateString()}
                            </Typography>
                          }
                        />
                      </ListItem>
                      {index < activityFeed.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>

          {/* Recommended Events */}
          <Card elevation={0} sx={{ bgcolor: 'white', border: '1px solid', borderColor: 'rgba(0, 0, 0, 0.08)', borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                  ⭐ Recommended Events
                </Typography>
                <IconButton size="small" sx={{ color: '#1a1a1a' }}>
                  <Notifications />
                </IconButton>
              </Box>

              {recommendedEvents.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    No events available
                  </Typography>
                </Box>
              ) : (
                <Box>
                  {recommendedEvents.slice(0, 3).map((event) => (
                    <Paper
                      key={event._id}
                      elevation={0}
                      sx={{
                        p: 2,
                        mb: 2,
                        cursor: 'pointer',
                        border: '1px solid',
                        borderColor: 'rgba(0, 0, 0, 0.08)',
                        borderRadius: 2,
                        '&:hover': {
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                          borderColor: '#1a1a1a',
                        },
                        transition: 'all 0.3s ease',
                      }}
                      onClick={() => handleEventClick(event._id)}
                    >
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {event.title}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <Chip
                          label={event.sport}
                          size="small"
                          sx={{ bgcolor: '#1a1a1a', color: 'white', fontWeight: 600, borderRadius: 2 }}
                        />
                        <Chip
                          label={event.eventType}
                          size="small"
                          sx={{ bgcolor: 'rgba(0, 0, 0, 0.05)', color: '#666', fontWeight: 600, borderRadius: 2 }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CalendarToday sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                          {new Date(event.startDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                  <Button
                    fullWidth
                    variant="outlined"
                    endIcon={<ArrowForward />}
                    onClick={() => navigate('/events')}
                    sx={{
                      mt: 1,
                      borderColor: '#1a1a1a',
                      borderWidth: 2,
                      color: '#1a1a1a',
                      fontWeight: 600,
                      textTransform: 'none',
                      py: 1,
                      borderRadius: 2,
                      '&:hover': {
                        borderWidth: 2,
                        borderColor: '#1a1a1a',
                        bgcolor: 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                  >
                    View All Events
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserDashboard;
