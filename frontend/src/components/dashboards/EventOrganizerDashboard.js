import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import api from '../../utils/api';

function EventOrganizerDashboard() {
  const [tabValue, setTabValue] = useState(0);
  const [events, setEvents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    sport: '',
    eventType: 'match',
    venue: 'default',
    startDate: '',
    endDate: '',
    ticketCategories: [
      { name: 'General', price: 10, available: 100 },
      { name: 'VIP', price: 50, available: 20 },
    ],
    status: 'draft',
  });

  useEffect(() => {
    loadEvents();
    loadVenues();
  }, []);

  const loadEvents = async () => {
    try {
      const response = await api.get('/organizer/events');
      setEvents(response.data.events || []);
    } catch (error) {
      console.error('Failed to load events:', error);
    }
  };

  const loadVenues = async () => {
    try {
      // Create a default venue if none exists
      const defaultVenue = {
        _id: 'default',
        name: 'Main Stadium',
        address: { city: 'Default City', country: 'Default Country' },
        capacity: 1000,
      };
      setVenues([defaultVenue]);
    } catch (error) {
      console.error('Failed to load venues:', error);
    }
  };

  const handleCreateEvent = async () => {
    try {
      // Validate required fields
      if (!formData.title || !formData.description || !formData.sport || !formData.startDate || !formData.endDate) {
        alert('Please fill in all required fields');
        return;
      }

      // Ensure venue is set to default if not selected
      const eventData = {
        ...formData,
        venue: formData.venue || 'default',
      };
      
      if (currentEvent) {
        await api.put(`/events/${currentEvent._id}`, eventData);
      } else {
        await api.post('/events', eventData);
      }
      setOpenDialog(false);
      loadEvents();
      resetForm();
      alert('Event saved successfully!');
    } catch (error) {
      console.error('Failed to save event:', error);
      console.error('Error details:', error.response?.data);
      alert(error.response?.data?.message || 'Failed to save event. Check console for details.');
    }
  };

  const handleEditEvent = (event) => {
    setCurrentEvent(event);
    setFormData(event);
    setOpenDialog(true);
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await api.delete(`/events/${eventId}`);
        loadEvents();
      } catch (error) {
        console.error('Failed to delete event:', error);
      }
    }
  };

  const resetForm = () => {
    setCurrentEvent(null);
    setFormData({
      title: '',
      description: '',
      sport: '',
      eventType: 'match',
      venue: 'default',
      startDate: '',
      endDate: '',
      ticketCategories: [
        { name: 'General', price: 10, available: 100 },
        { name: 'VIP', price: 50, available: 20 },
      ],
      status: 'draft',
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1E40AF' }}>
          Event Organizer Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            resetForm();
            setOpenDialog(true);
          }}
          sx={{
            bgcolor: '#1E40AF',
            '&:hover': { bgcolor: '#1E3A8A' },
          }}
        >
          Create Event
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#EFF6FF' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Total Events
              </Typography>
              <Typography variant="h3" sx={{ color: '#1E40AF', fontWeight: 'bold' }}>
                {events.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#DBEAFE' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Published Events
              </Typography>
              <Typography variant="h3" sx={{ color: '#1E40AF', fontWeight: 'bold' }}>
                {events.filter((e) => e.status === 'published').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#EFF6FF' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Total Revenue
              </Typography>
              <Typography variant="h3" sx={{ color: '#1E40AF', fontWeight: 'bold' }}>
                ${events.reduce((sum, e) => sum + (e.totalRevenue || 0), 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="All Events" />
          <Tab label="Draft" />
          <Tab label="Published" />
          <Tab label="Completed" />
        </Tabs>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#F8FAFC' }}>
                <TableCell><strong>Title</strong></TableCell>
                <TableCell><strong>Sport</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Revenue</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events
                .filter((event) => {
                  if (tabValue === 0) return true;
                  if (tabValue === 1) return event.status === 'draft';
                  if (tabValue === 2) return event.status === 'published';
                  if (tabValue === 3) return event.status === 'completed';
                  return true;
                })
                .map((event) => (
                  <TableRow key={event._id}>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.sport}</TableCell>
                    <TableCell>
                      {event.startDate ? new Date(event.startDate).toLocaleDateString() : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={event.status}
                        color={
                          event.status === 'published'
                            ? 'success'
                            : event.status === 'draft'
                            ? 'warning'
                            : 'default'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>${event.totalRevenue || 0}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => handleEditEvent(event)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteEvent(event._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{currentEvent ? 'Edit Event' : 'Create New Event'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Sport"
                value={formData.sport}
                onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Event Type"
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                SelectProps={{ native: true }}
              >
                <option value="match">Match</option>
                <option value="tournament">Tournament</option>
                <option value="workshop">Workshop</option>
                <option value="camp">Camp</option>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="datetime-local"
                label="Start Date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="datetime-local"
                label="End Date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Venue"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                SelectProps={{ native: true }}
              >
                <option value="">Select Venue</option>
                {venues.map((venue) => (
                  <option key={venue._id} value={venue._id}>
                    {venue.name}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                SelectProps={{ native: true }}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateEvent} sx={{ bgcolor: '#1E40AF' }}>
            {currentEvent ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default EventOrganizerDashboard;
