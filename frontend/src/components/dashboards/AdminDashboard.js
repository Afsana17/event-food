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
  People as PeopleIcon,
  Event as EventIcon,
  EmojiEvents as EmojiEventsIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  PersonAdd as PersonAddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import api from '../../utils/api';
import CreateSpecialUser from '../Admin/CreateSpecialUser';

function AdminDashboard() {
  const [tabValue, setTabValue] = useState(0);
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [events, setEvents] = useState([]);
  const [openCreateUser, setOpenCreateUser] = useState(false);
  const [openEditEvent, setOpenEditEvent] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [eventFormData, setEventFormData] = useState({
    title: '',
    description: '',
    sport: '',
    eventType: 'match',
    startDate: '',
    endDate: '',
    status: 'draft',
  });

  useEffect(() => {
    loadStats();
    loadUsers();
    loadPendingApprovals();
    loadEvents();
  }, []);

  const loadStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      setStats(response.data.stats);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const loadPendingApprovals = async () => {
    try {
      const response = await api.get('/admin/users?isApproved=false');
      setPendingApprovals(response.data.users);
    } catch (error) {
      console.error('Failed to load pending approvals:', error);
    }
  };

  const loadEvents = async () => {
    try {
      const response = await api.get('/events');
      setEvents(response.data.events || []);
    } catch (error) {
      console.error('Failed to load events:', error);
    }
  };

  const handleApproval = async (userId, isApproved) => {
    try {
      await api.put('/admin/users/approve', { userId, isApproved });
      loadPendingApprovals();
      loadUsers();
      loadStats();
    } catch (error) {
      console.error('Failed to update approval:', error);
    }
  };

  const handleEditEvent = (event) => {
    setCurrentEvent(event);
    setEventFormData({
      title: event.title,
      description: event.description,
      sport: event.sport,
      eventType: event.eventType,
      startDate: event.startDate ? event.startDate.slice(0, 16) : '',
      endDate: event.endDate ? event.endDate.slice(0, 16) : '',
      status: event.status,
    });
    setOpenEditEvent(true);
  };

  const handleUpdateEvent = async () => {
    try {
      await api.put(`/events/${currentEvent._id}`, eventFormData);
      setOpenEditEvent(false);
      loadEvents();
      alert('Event updated successfully!');
    } catch (error) {
      console.error('Failed to update event:', error);
      alert(error.response?.data?.message || 'Failed to update event');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await api.delete(`/events/${eventId}`);
        loadEvents();
        alert('Event deleted successfully!');
      } catch (error) {
        console.error('Failed to delete event:', error);
        alert(error.response?.data?.message || 'Failed to delete event');
      }
    }
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>
                Welcome, Admin 👋
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Manage your platform and oversee all operations
              </Typography>
            </Box>
            {/* Role Badge */}
            <Chip
              label="ADMIN"
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

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
          Dashboard Overview
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={() => setOpenCreateUser(true)}
          sx={{
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
          Create Special User
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card elevation={0} sx={{ bgcolor: 'white', border: '1px solid', borderColor: 'rgba(0, 0, 0, 0.08)', borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon sx={{ fontSize: 32, color: '#1a1a1a', mr: 1 }} />
                <Typography variant="h6" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
                  Total Users
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ color: '#1a1a1a', fontWeight: 900 }}>
                {stats.totalUsers || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card elevation={0} sx={{ bgcolor: 'white', border: '1px solid', borderColor: 'rgba(0, 0, 0, 0.08)', borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EventIcon sx={{ fontSize: 32, color: '#1a1a1a', mr: 1 }} />
                <Typography variant="h6" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
                  Total Events
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ color: '#1a1a1a', fontWeight: 900 }}>
                {stats.totalEvents || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card elevation={0} sx={{ bgcolor: 'white', border: '1px solid', borderColor: 'rgba(0, 0, 0, 0.08)', borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmojiEventsIcon sx={{ fontSize: 32, color: '#1a1a1a', mr: 1 }} />
                <Typography variant="h6" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
                  Programs
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ color: '#1a1a1a', fontWeight: 900 }}>
                {stats.totalPrograms || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card elevation={0} sx={{ bgcolor: '#FFF8E1', border: '1px solid', borderColor: '#FDD835', borderRadius: 3, boxShadow: '0 4px 12px rgba(253, 216, 53, 0.2)' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon sx={{ fontSize: 32, color: '#F9A825', mr: 1 }} />
                <Typography variant="h6" sx={{ fontSize: '0.9rem', color: '#F9A825' }}>
                  Pending Approvals
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ color: '#F9A825', fontWeight: 900 }}>
                {stats.pendingApprovals || 0}
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
          <Tab label="Pending Approvals" />
          <Tab label="All Users" />
          <Tab label="Event Organizers" />
          <Tab label="Vendors" />
          <Tab label="Coaches" />
          <Tab label="All Events" />
        </Tabs>

        {tabValue === 0 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#FAFAFA' }}>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Role</strong></TableCell>
                  <TableCell><strong>Registration Date</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingApprovals.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip label={user.role} size="small" />
                    </TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        startIcon={<CheckCircleIcon />}
                        onClick={() => handleApproval(user._id, true)}
                        sx={{ mr: 1 }}
                      >
                        Approve
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        startIcon={<CancelIcon />}
                        onClick={() => handleApproval(user._id, false)}
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {pendingApprovals.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Typography color="textSecondary">No pending approvals</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {tabValue >= 1 && tabValue <= 4 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#F8FAFC' }}>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Role</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Verified</strong></TableCell>
                  <TableCell><strong>Joined</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .filter((user) => {
                    if (tabValue === 1) return true;
                    if (tabValue === 2) return user.role === 'event_organizer';
                    if (tabValue === 3) return user.role === 'vendor';
                    if (tabValue === 4) return user.role === 'coach';
                    return true;
                  })
                  .map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Chip label={user.role} size="small" />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.isApproved ? 'Approved' : 'Pending'}
                          color={user.isApproved ? 'success' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.isVerified ? 'Yes' : 'No'}
                          color={user.isVerified ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {tabValue === 5 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#F8FAFC' }}>
                  <TableCell><strong>Title</strong></TableCell>
                  <TableCell><strong>Sport</strong></TableCell>
                  <TableCell><strong>Type</strong></TableCell>
                  <TableCell><strong>Start Date</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Organizer</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event._id}>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.sport}</TableCell>
                    <TableCell>
                      <Chip label={event.eventType} size="small" variant="outlined" />
                    </TableCell>
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
                    <TableCell>{event.organizer?.name || 'N/A'}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => handleEditEvent(event)}
                        sx={{ mr: 1 }}
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
                {events.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography color="textSecondary">No events found</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <CreateSpecialUser
        open={openCreateUser}
        onClose={() => setOpenCreateUser(false)}
        onUserCreated={() => {
          loadUsers();
          loadStats();
        }}
      />

      {/* Edit Event Dialog */}
      <Dialog open={openEditEvent} onClose={() => setOpenEditEvent(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event Title"
                value={eventFormData.title}
                onChange={(e) => setEventFormData({ ...eventFormData, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={eventFormData.description}
                onChange={(e) => setEventFormData({ ...eventFormData, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Sport"
                value={eventFormData.sport}
                onChange={(e) => setEventFormData({ ...eventFormData, sport: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Event Type"
                value={eventFormData.eventType}
                onChange={(e) => setEventFormData({ ...eventFormData, eventType: e.target.value })}
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
                value={eventFormData.startDate}
                onChange={(e) => setEventFormData({ ...eventFormData, startDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="datetime-local"
                label="End Date"
                value={eventFormData.endDate}
                onChange={(e) => setEventFormData({ ...eventFormData, endDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Status"
                value={eventFormData.status}
                onChange={(e) => setEventFormData({ ...eventFormData, status: e.target.value })}
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
          <Button onClick={() => setOpenEditEvent(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdateEvent} sx={{ bgcolor: '#1E40AF' }}>
            Update Event
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdminDashboard;
