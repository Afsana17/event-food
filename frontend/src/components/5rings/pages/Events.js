import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  TextField,
  MenuItem,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  Tooltip,
  Badge,
  Avatar,
  Stack,
  Paper,
  Tab,
  Tabs,
  Rating,
  Divider,
  alpha,
  styled,
  Switch
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import Layout from '../components/Layout.js';
import {
  CalendarToday,
  LocationOn,
  EmojiEvents,
  Search,
  ConfirmationNumber,
  Stadium,
  ViewModule as ViewModuleIcon,
  CalendarMonth as CalendarIcon,
  Share as ShareIcon,
  BookmarkBorder as BookmarkIcon,
  Bookmark as BookmarkFilledIcon,
  FilterList as FilterListIcon,
  Visibility as VisibilityIcon,
  Group as GroupIcon,
  AccessTime as TimeIcon,
  Map as MapIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import axios from 'axios';

// Styled components
const StyledEventCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 16,
  border: `1px solid ${alpha(theme.palette.grey[300], 0.5)}`,
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
    borderColor: theme.palette.primary.main,
    '& .event-image': {
      transform: 'scale(1.05)'
    }
  }
}));

const fallbackEvents = [
  {
    _id: 'fallback-football-event',
    name: 'Football League Night',
    description: 'Competitive football matches with professional turf facilities.',
    sport: 'Football',
    type: 'match',
    status: 'upcoming',
    startDate: '2026-04-18T16:00:00.000Z',
    endDate: '2026-04-18T19:00:00.000Z',
    venue: { name: '5RINGS Main Arena' },
    ticketPrice: 1800,
    images: ['/events/football.jpg']
  },
  {
    _id: 'fallback-cricket-event',
    name: 'Cricket Live Practice Cup',
    description: 'Cricket practice and match play event for all levels.',
    sport: 'Cricket',
    type: 'tournament',
    status: 'ongoing',
    startDate: '2026-04-20T15:00:00.000Z',
    endDate: '2026-04-20T19:00:00.000Z',
    venue: { name: '5RINGS Cricket Zone' },
    ticketPrice: 1600,
    images: ['/events/cricket.jpg']
  }
];

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sportFilter, setSportFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' });
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'calendar'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openBooking, setOpenBooking] = useState(false);
  const [openQuickView, setOpenQuickView] = useState(false);
  const [savedEvents, setSavedEvents] = useState([]);
  const [bookingData, setBookingData] = useState({
    category: '',
    seatNumber: '',
    mealCombo: false
  });
  const navigate = useNavigate();

  const eventTypes = ['All', 'match', 'tournament', 'workshop', 'camp', 'training'];
  const sports = ['All', 'Football', 'Cricket', 'Tennis', 'Kick boxing', 'Table tennis', 'Silambam', 'Arcery'];

  useEffect(() => {
    fetchEvents();
    loadSavedEvents();
  }, [statusFilter]);

  useEffect(() => {
    filterEvents();
  }, [events, searchTerm, sportFilter, typeFilter, dateFilter]);

  const loadSavedEvents = () => {
    const saved = localStorage.getItem('savedEvents');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const normalizedIds = Array.isArray(parsed) ? parsed.map((id) => String(id)) : [];
        setSavedEvents(normalizedIds);
      } catch {
        setSavedEvents([]);
      }
    }
  };

  const toggleSaveEvent = (eventId) => {
    const normalizedEventId = String(eventId);
    const newSaved = savedEvents.includes(normalizedEventId)
      ? savedEvents.filter((id) => id !== normalizedEventId)
      : [...savedEvents, normalizedEventId];
    
    setSavedEvents(newSaved);
    localStorage.setItem('savedEvents', JSON.stringify(newSaved));
  };

  const shareEvent = async (event) => {
    if (navigator.share) {
      await navigator.share({
        title: event.name,
        text: `Join this exciting event: ${event.name}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(
        `Check out this event: ${event.name} - ${window.location.href}`
      );
      alert('Event link copied to clipboard!');
    }
  };

  const openQuickViewDialog = (event) => {
    setSelectedEvent(event);
    setOpenQuickView(true);
  };

  const fetchEvents = async () => {
    try {
      const params = {};
      if (statusFilter) params.status = statusFilter;
      const response = await axios.get('http://localhost:5000/api/events', { params });
      const normalizedEvents = (response.data.events || []).map((event, index) => ({
        ...event,
        _id: event._id || `event-${index}`,
        name: event.name || event.title || 'Untitled Event',
        type: event.type || event.eventType || '',
        ticketPrice: event.ticketPrice || event.ticketCategories?.[0]?.price || 0,
        status: event.status || 'upcoming',
      }));

      const eventById = new Map();
      [...normalizedEvents, ...fallbackEvents].forEach((event) => {
        eventById.set(event._id, event);
      });

      setEvents(Array.from(eventById.values()));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents(fallbackEvents);
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = [...events];

    if (searchTerm) {
      filtered = filtered.filter(e =>
        e.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.venue?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sportFilter && sportFilter !== 'All') {
      filtered = filtered.filter(e => e.sport === sportFilter);
    }

    if (typeFilter && typeFilter !== 'All') {
      filtered = filtered.filter(e => (e.type || e.eventType) === typeFilter);
    }

    // Date range filtering
    if (dateFilter.from) {
      filtered = filtered.filter(e => new Date(e.startDate) >= new Date(dateFilter.from));
    }
    if (dateFilter.to) {
      filtered = filtered.filter(e => new Date(e.startDate) <= new Date(dateFilter.to));
    }

    setFilteredEvents(filtered);
  };

  const handleBookTicket = (event) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    setSelectedEvent(event);
    setOpenBooking(true);
  };

  const handleConfirmBooking = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/tickets',
        {
          eventId: selectedEvent._id,
          ...bookingData
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert('Ticket booked successfully!');
      setOpenBooking(false);
      setBookingData({ category: '', seatNumber: '', mealCombo: false });
    } catch (error) {
      alert(error.response?.data?.message || 'Booking failed');
    }
  };

  const handleWhatsAppInquiry = (event) => {
    const message = `Hi, I'm interested in the event: ${event.name}`;
    window.open(`https://wa.me/919361301119?text=${encodeURIComponent(message)}`, '_blank');
  };

  const getStatusChipSx = (status, onDark = false) => {
    const base = {
      fontWeight: 600,
      textTransform: 'capitalize',
      border: '1px solid',
      backdropFilter: 'blur(8px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
    };

    if (onDark) {
      return {
        ...base,
        bgcolor: 'rgba(255, 255, 255, 0.24)',
        borderColor: 'rgba(255, 255, 255, 0.55)',
        color: 'white'
      };
    }

    switch (status) {
      case 'upcoming':
      case 'ongoing':
        return {
          ...base,
          bgcolor: 'rgba(255, 255, 255, 0.94)',
          borderColor: 'rgba(17, 24, 39, 0.28)',
          color: '#1f2937'
        };
      case 'completed':
        return {
          ...base,
          bgcolor: 'rgba(107, 114, 128, 0.10)',
          borderColor: 'rgba(107, 114, 128, 0.28)',
          color: '#4b5563'
        };
      default:
        return {
          ...base,
          bgcolor: 'rgba(255, 255, 255, 0.94)',
          borderColor: 'rgba(17, 24, 39, 0.28)',
          color: '#1f2937'
        };
    }
  };

  return (
    <Layout>
      <Box sx={{ pt: 12, bgcolor: '#FAFAFA', minHeight: '100vh' }}>
        {/* Hero Section */}
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          <Box sx={{ maxWidth: 900, mx: 'auto', textAlign: 'center', mb: 8 }}>
            <Typography variant="h1" fontWeight={900} sx={{ fontSize: { xs: '3rem', md: '4.5rem' }, mb: 3, color: '#1a1a1a' }}>
              Our{' '}
              <Box component="span" sx={{ position: 'relative', display: 'inline-block', '&::after': { content: '""', position: 'absolute', bottom: 8, left: 0, width: '100%', height: 12, bgcolor: 'rgba(0, 0, 0, 0.1)', zIndex: -1 } }}>
                Events
              </Box>
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ fontSize: '1.25rem' }}>
              Join exciting sports events, tournaments, and workshops
            </Typography>
          </Box>

          {/* Enhanced Filters */}
          <Card elevation={0} sx={{ p: 3, mb: 6, bgcolor: 'white', border: '1px solid', borderColor: 'rgba(0, 0, 0, 0.08)', borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FilterListIcon />
                Event Filters
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title={viewMode === 'grid' ? 'Calendar View' : 'Grid View'}>
                  <IconButton 
                    onClick={() => setViewMode(viewMode === 'grid' ? 'calendar' : 'grid')}
                    sx={{ 
                      bgcolor: 'primary.main', 
                      color: 'white',
                      '&:hover': { bgcolor: 'primary.dark' }
                    }}
                  >
                    {viewMode === 'grid' ? <CalendarIcon /> : <ViewModuleIcon />}
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Filters available: Search, Sport, Type, From Date, To Date, and Status (All, Upcoming, Live, Completed).
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  select
                  fullWidth
                  label="Sport"
                  value={sportFilter}
                  onChange={(e) => setSportFilter(e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                >
                  {sports.map((sport) => (
                    <MenuItem key={sport} value={sport}>{sport}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  select
                  fullWidth
                  label="Type"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                >
                  {eventTypes.map((type) => (
                    <MenuItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  type="date"
                  fullWidth
                  label="From Date"
                  value={dateFilter.from}
                  onChange={(e) => setDateFilter(prev => ({ ...prev, from: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  type="date"
                  fullWidth
                  label="To Date"
                  value={dateFilter.to}
                  onChange={(e) => setDateFilter(prev => ({ ...prev, to: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={1}>
                <TextField
                  select
                  fullWidth
                  label="Status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="upcoming">Upcoming</MenuItem>
                  <MenuItem value="ongoing">Live</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            
            {/* Quick Stats */}
            <Box sx={{ display: 'flex', gap: 3, mt: 3, pt: 3, borderTop: 1, borderColor: 'grey.200' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Badge badgeContent={filteredEvents.length} color="primary">
                  <EmojiEvents color="action" />
                </Badge>
                <Typography variant="body2" color="text.secondary">
                  Events Found
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Badge badgeContent={savedEvents.length} color="secondary">
                  <BookmarkIcon color="action" />
                </Badge>
                <Typography variant="body2" color="text.secondary">
                  Saved Events
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Badge 
                  badgeContent={filteredEvents.filter(e => e.status === 'upcoming').length} 
                  color="success"
                >
                  <CalendarToday color="action" />
                </Badge>
                <Typography variant="body2" color="text.secondary">
                  Upcoming
                </Typography>
              </Box>
            </Box>
          </Card>

          {/* Events Grid */}
          {loading ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <TrendingUpIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">Loading events...</Typography>
            </Box>
          ) : filteredEvents.length === 0 ? (
            <Paper sx={{ p: 8, textAlign: 'center', borderRadius: 3 }}>
              <EmojiEvents sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
              <Typography variant="h5" fontWeight={600} gutterBottom>No events found</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Try adjusting your search criteria or check back later for new events.
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<Search />}
                onClick={() => {
                  setSearchTerm('');
                  setSportFilter('');
                  setTypeFilter('');
                  setDateFilter({ from: '', to: '' });
                }}
              >
                Clear Filters
              </Button>
            </Paper>
          ) : (
            <Grid container spacing={4}>
              {filteredEvents.map((event) => (
                <Grid item xs={12} sm={6} md={4} key={event._id}>
                  <StyledEventCard>
                    <Box sx={{ position: 'relative', overflow: 'hidden', height: 220 }}>
                      {event.images && event.images[0] ? (
                        <CardMedia
                          component="img"
                          image={event.images[0]}
                          alt={event.name}
                          className="event-image"
                          sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                        />
                      ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', bgcolor: 'grey.100' }}>
                          <EmojiEvents sx={{ fontSize: 64, color: 'grey.400' }} />
                        </Box>
                      )}
                      
                      {/* Status Badge */}
                      <Chip
                        label={event.status || 'upcoming'}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          zIndex: 3,
                          ...getStatusChipSx(event.status)
                        }}
                      />
                      
                      {/* Sport Badge */}
                      {event.sport && (
                        <Chip
                          label={event.sport}
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            bgcolor: 'rgba(255,255,255,0.9)',
                            fontWeight: 600,
                            backdropFilter: 'blur(8px)'
                          }}
                        />
                      )}
                      
                      {/* Action Buttons */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 48,
                          right: 12,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 0.75,
                          zIndex: 3,
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSaveEvent(event._id);
                          }}
                          sx={{
                            width: 30,
                            height: 30,
                            bgcolor: 'rgba(255,255,255,0.94)',
                            color: '#1f2937',
                            border: '1px solid rgba(17,24,39,0.12)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            '&:hover': {
                              bgcolor: 'rgba(255,255,255,1)',
                              color: '#111827'
                            }
                          }}
                        >
                          {savedEvents.includes(String(event._id)) ? 
                            <BookmarkFilledIcon fontSize="small" color="primary" /> : 
                            <BookmarkIcon fontSize="small" />
                          }
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            shareEvent(event);
                          }}
                          sx={{
                            width: 30,
                            height: 30,
                            bgcolor: 'rgba(255,255,255,0.94)',
                            color: '#1f2937',
                            border: '1px solid rgba(17,24,39,0.12)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            '&:hover': {
                              bgcolor: 'rgba(255,255,255,1)',
                              color: '#111827'
                            }
                          }}
                        >
                          <ShareIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                    
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography variant="h6" fontWeight={700} sx={{ mb: 1, minHeight: 48, lineHeight: 1.3 }}>
                        {event.name}
                      </Typography>
                      
                      {/* Event Details */}
                      <Stack spacing={1.5} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {new Date(event.startDate).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <TimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {new Date(event.startDate).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {event.venue?.name || 'TBA'}
                          </Typography>
                        </Box>
                        
                        {event.type && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Stadium sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                              {event.type}
                            </Typography>
                          </Box>
                        )}
                        
                        {event.maxParticipants && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <GroupIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              Max: {event.maxParticipants} participants
                            </Typography>
                          </Box>
                        )}
                      </Stack>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" fontWeight={900} sx={{ color: '#1a1a1a' }}>
                          ₹{event.ticketPrice?.toLocaleString() || '0'}
                        </Typography>
                        {event.registrationCount && (
                          <Chip 
                            label={`${event.registrationCount} registered`}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        )}
                      </Box>
                    </CardContent>
                    
                    <CardActions sx={{ p: 3, pt: 0, display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<VisibilityIcon />}
                        onClick={() => openQuickViewDialog(event)}
                        sx={{ flexGrow: 1, borderRadius: 2 }}
                      >
                        Quick View
                      </Button>
                      
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<ConfirmationNumber />}
                        onClick={() => handleBookTicket(event)}
                        disabled={event.status === 'completed'}
                        sx={{
                          flexGrow: 2,
                          bgcolor: '#1a1a1a',
                          color: 'white',
                          fontWeight: 600,
                          borderRadius: 2,
                          '&:hover': { bgcolor: '#2a2a2a' },
                          '&:disabled': { bgcolor: 'grey.300', color: 'grey.600' }
                        }}
                      >
                        {event.status === 'completed' ? 'Ended' : 'Book Now'}
                      </Button>
                      
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleWhatsAppInquiry(event)}
                        sx={{
                          minWidth: 44,
                          borderColor: '#25D366',
                          color: '#25D366',
                          borderRadius: 2,
                          '&:hover': {
                            borderColor: '#25D366',
                            bgcolor: 'rgba(37, 211, 102, 0.08)'
                          }
                        }}
                      >
                        <WhatsAppIcon fontSize="small" />
                      </Button>
                    </CardActions>
                  </StyledEventCard>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      {/* Quick View Dialog */}
      <Dialog 
        open={openQuickView} 
        onClose={() => setOpenQuickView(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, overflow: 'hidden' }
        }}
      >
        {selectedEvent && (
          <Box>
            {/* Header Image */}
            <Box sx={{ position: 'relative', height: 250, overflow: 'hidden' }}>
              {selectedEvent.images?.[0] ? (
                <img
                  src={selectedEvent.images[0]}
                  alt={selectedEvent.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <Box sx={{ 
                  width: '100%', 
                  height: '100%', 
                  bgcolor: 'grey.100', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <EmojiEvents sx={{ fontSize: 80, color: 'grey.400' }} />
                </Box>
              )}
              
              {/* Overlay with basic info */}
              <Box sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                p: 3,
                color: 'white'
              }}>
                <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
                  {selectedEvent.name}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                  <Chip
                    label={selectedEvent.status}
                    size="small"
                    sx={getStatusChipSx(selectedEvent.status, true)}
                  />
                  {selectedEvent.sport && (
                    <Chip label={selectedEvent.sport} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                  )}
                  {selectedEvent.type && (
                    <Chip label={selectedEvent.type} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                  )}
                </Box>
              </Box>
              
              {/* Close Button */}
              <IconButton
                onClick={() => setOpenQuickView(false)}
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  bgcolor: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
                }}
              >
                ×
              </IconButton>
            </Box>
            
            {/* Content */}
            <DialogContent sx={{ p: 4 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Event Details
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                    {selectedEvent.description || 'No description available for this event.'}
                  </Typography>
                  
                  {selectedEvent.features && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                        Event Features
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {selectedEvent.features.split(',').map((feature, index) => (
                          <Chip key={index} label={feature.trim()} size="small" variant="outlined" />
                        ))}
                      </Box>
                    </Box>
                  )}
                  
                  {selectedEvent.rules && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                        Rules & Guidelines
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedEvent.rules}
                      </Typography>
                    </Box>
                  )}
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
                    <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                      Event Information
                    </Typography>
                    
                    <Stack spacing={2}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <CalendarToday color="primary" />
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {new Date(selectedEvent.startDate).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(selectedEvent.startDate).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <LocationOn color="primary" />
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {selectedEvent.venue?.name || 'Venue TBA'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {selectedEvent.venue?.address || 'Address will be provided'}
                          </Typography>
                        </Box>
                      </Box>
                      
                      {selectedEvent.maxParticipants && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <GroupIcon color="primary" />
                          <Box>
                            <Typography variant="body2" fontWeight={600}>
                              {selectedEvent.maxParticipants} Max Participants
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {selectedEvent.registrationCount || 0} already registered
                            </Typography>
                          </Box>
                        </Box>
                      )}
                      
                      <Divider sx={{ my: 1 }} />
                      
                      <Box sx={{ textAlign: 'center', py: 2 }}>
                        <Typography variant="h4" fontWeight={900} color="primary.main" sx={{ mb: 1 }}>
                          ₹{selectedEvent.ticketPrice?.toLocaleString() || '0'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Per Person
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>
            
            {/* Actions */}
            <DialogActions sx={{ p: 4, pt: 0, justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={savedEvents.includes(String(selectedEvent._id)) ? <BookmarkFilledIcon /> : <BookmarkIcon />}
                  onClick={() => toggleSaveEvent(selectedEvent._id)}
                >
                  {savedEvents.includes(String(selectedEvent._id)) ? 'Saved' : 'Save'}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ShareIcon />}
                  onClick={() => shareEvent(selectedEvent)}
                >
                  Share
                </Button>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<WhatsAppIcon />}
                  onClick={() => handleWhatsAppInquiry(selectedEvent)}
                  sx={{
                    borderColor: '#25D366',
                    color: '#25D366',
                    '&:hover': { borderColor: '#25D366', bgcolor: 'rgba(37, 211, 102, 0.08)' }
                  }}
                >
                  WhatsApp
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ConfirmationNumber />}
                  onClick={() => {
                    setOpenQuickView(false);
                    handleBookTicket(selectedEvent);
                  }}
                  disabled={selectedEvent.status === 'completed'}
                  sx={{
                    bgcolor: '#1a1a1a',
                    minWidth: 140,
                    '&:hover': { bgcolor: '#2a2a2a' }
                  }}
                >
                  {selectedEvent.status === 'completed' ? 'Event Ended' : 'Book Tickets'}
                </Button>
              </Box>
            </DialogActions>
          </Box>
        )}
      </Dialog>

      {/* Enhanced Booking Dialog */}
      <Dialog 
        open={openBooking} 
        onClose={() => setOpenBooking(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
            Book Your Ticket
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {selectedEvent?.name}
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ pb: 2 }}>
          {selectedEvent && (
            <Box sx={{ mb: 3 }}>
              <Paper sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Event Date</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {new Date(selectedEvent.startDate).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Venue</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {selectedEvent.venue?.name || 'TBA'}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          )}
          
          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Ticket Category</InputLabel>
              <Select
                value={bookingData.category}
                label="Ticket Category"
                onChange={(e) => setBookingData({ ...bookingData, category: e.target.value })}
              >
                <MenuItem value="VIP">
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography>VIP</Typography>
                    <Typography fontWeight={600}>₹{selectedEvent?.ticketPrice * 2}</Typography>
                  </Box>
                </MenuItem>
                <MenuItem value="Premium">
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography>Premium</Typography>
                    <Typography fontWeight={600}>₹{Math.floor(selectedEvent?.ticketPrice * 1.5)}</Typography>
                  </Box>
                </MenuItem>
                <MenuItem value="General">
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography>General</Typography>
                    <Typography fontWeight={600}>₹{selectedEvent?.ticketPrice}</Typography>
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              fullWidth
              label="Seat Number (optional)"
              value={bookingData.seatNumber}
              onChange={(e) => setBookingData({ ...bookingData, seatNumber: e.target.value })}
              placeholder="e.g., A12, B5"
              sx={{ mb: 3 }}
            />
            
            <Paper sx={{ p: 2, bgcolor: 'primary.50', border: 1, borderColor: 'primary.200' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    Meal Combo Add-on
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Includes snacks and beverages (+₹200)
                  </Typography>
                </Box>
                <Switch
                  checked={bookingData.mealCombo}
                  onChange={(e) => setBookingData({ ...bookingData, mealCombo: e.target.checked })}
                />
              </Box>
            </Paper>
            
            {bookingData.category && (
              <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                  Booking Summary
                </Typography>
                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">
                      {bookingData.category} Ticket
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      ₹{bookingData.category === 'VIP' ? selectedEvent?.ticketPrice * 2 :
                         bookingData.category === 'Premium' ? Math.floor(selectedEvent?.ticketPrice * 1.5) :
                         selectedEvent?.ticketPrice}
                    </Typography>
                  </Box>
                  {bookingData.mealCombo && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Meal Combo</Typography>
                      <Typography variant="body2" fontWeight={600}>₹200</Typography>
                    </Box>
                  )}
                  <Divider />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1" fontWeight={700}>Total</Typography>
                    <Typography variant="body1" fontWeight={700}>
                      ₹{(
                        (bookingData.category === 'VIP' ? selectedEvent?.ticketPrice * 2 :
                         bookingData.category === 'Premium' ? Math.floor(selectedEvent?.ticketPrice * 1.5) :
                         selectedEvent?.ticketPrice) + 
                        (bookingData.mealCombo ? 200 : 0)
                      ).toLocaleString()}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            )}
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={() => setOpenBooking(false)} 
            size="large"
            sx={{ color: 'text.secondary' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmBooking}
            disabled={!bookingData.category}
            size="large"
            sx={{
              bgcolor: '#1a1a1a',
              minWidth: 140,
              fontWeight: 600,
              borderRadius: 2,
              '&:hover': { bgcolor: '#2a2a2a' }
            }}
          >
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Events;
