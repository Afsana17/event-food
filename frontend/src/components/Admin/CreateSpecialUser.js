import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Alert,
  MenuItem,
  Typography,
  Box,
} from '@mui/material';
import axios from 'axios';

function CreateSpecialUser({ open, onClose, onUserCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'event_organizer',
    phone: '',
    // Role-specific fields
    companyName: '',
    kitchenName: '',
    cuisine: '',
    licenseNumber: '',
    specialization: '',
    experience: '',
    certifications: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const token = localStorage.getItem('token');

      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone,
        isVerified: true, // Admin-created accounts are pre-verified
        isApproved: true, // Admin-created accounts are pre-approved
      };

      // Add role-specific profiles
      if (formData.role === 'event_organizer') {
        payload.organizerProfile = {
          companyName: formData.companyName,
          bio: `Event organizer at ${formData.companyName}`,
        };
      } else if (formData.role === 'vendor') {
        payload.vendorProfile = {
          kitchenName: formData.kitchenName,
          cuisine: formData.cuisine,
          licenseNumber: formData.licenseNumber,
          bio: `${formData.cuisine} cuisine specialist`,
          isActive: true,
        };
      } else if (formData.role === 'coach') {
        payload.coachProfile = {
          specialization: formData.specialization,
          experience: formData.experience ? parseInt(formData.experience) : 0,
          certifications: formData.certifications ? formData.certifications.split(',').map(c => c.trim()) : [],
          bio: `${formData.specialization} coach with ${formData.experience} years experience`,
        };
      }

      await axios.post(`${API_URL}/admin/users/create`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onUserCreated();
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'event_organizer',
      phone: '',
      companyName: '',
      kitchenName: '',
      cuisine: '',
      licenseNumber: '',
      specialization: '',
      experience: '',
      certifications: '',
    });
    setError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1E40AF' }}>
          Create Special Role Account
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Create accounts for Event Organizers, Vendors, or Coaches
        </Typography>
      </DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                helperText="User can change this after first login"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                select
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <MenuItem value="event_organizer">Event Organizer</MenuItem>
                <MenuItem value="vendor">Vendor/Kitchen</MenuItem>
                <MenuItem value="coach">Coach</MenuItem>
              </TextField>
            </Grid>

            {/* Event Organizer Fields */}
            {formData.role === 'event_organizer' && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Company/Organization Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </Grid>
            )}

            {/* Vendor Fields */}
            {formData.role === 'vendor' && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Kitchen/Restaurant Name"
                    name="kitchenName"
                    value={formData.kitchenName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Cuisine Type"
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleChange}
                    placeholder="e.g., Italian, Indian, Healthy"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="License Number"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                  />
                </Grid>
              </>
            )}

            {/* Coach Fields */}
            {formData.role === 'coach' && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    placeholder="e.g., Cricket, Football, Basketball"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Years of Experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Certifications"
                    name="certifications"
                    value={formData.certifications}
                    onChange={handleChange}
                    placeholder="Comma-separated: Level 1 Coach, Sports Science Degree"
                    helperText="Separate multiple certifications with commas"
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          sx={{ bgcolor: '#1E40AF', '&:hover': { bgcolor: '#1E3A8A' } }}
        >
          {loading ? 'Creating...' : 'Create Account'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateSpecialUser;
