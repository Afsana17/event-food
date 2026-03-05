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
  FitnessCenter as FitnessCenterIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import api from '../../utils/api';

function CoachDashboard() {
  const [tabValue, setTabValue] = useState(0);
  const [programs, setPrograms] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentProgram, setCurrentProgram] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    sport: '',
    level: 'beginner',
    duration: {
      weeks: '',
      sessionsPerWeek: '',
      hoursPerSession: '',
    },
    price: '',
    maxStudents: '',
    schedule: [],
    venue: '',
  });

  useEffect(() => {
    loadPrograms();
    loadEnrollments();
  }, []);

  const loadPrograms = async () => {
    try {
      const response = await api.get('/coach/programs');
      setPrograms(response.data.programs);
    } catch (error) {
      console.error('Failed to load programs:', error);
    }
  };

  const loadEnrollments = async () => {
    try {
      const response = await api.get('/coach/enrollments');
      setEnrollments(response.data.enrollments);
    } catch (error) {
      console.error('Failed to load enrollments:', error);
    }
  };

  const handleSaveProgram = async () => {
    try {
      if (currentProgram) {
        await api.put(`/programs/${currentProgram._id}`, formData);
      } else {
        await api.post('/programs', formData);
      }
      setOpenDialog(false);
      loadPrograms();
      resetForm();
    } catch (error) {
      console.error('Failed to save program:', error);
    }
  };

  const resetForm = () => {
    setCurrentProgram(null);
    setFormData({
      title: '',
      description: '',
      sport: '',
      level: 'beginner',
      duration: {
        weeks: '',
        sessionsPerWeek: '',
        hoursPerSession: '',
      },
      price: '',
      maxStudents: '',
      schedule: [],
      venue: '',
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1E40AF' }}>
          Coach Dashboard
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
          Create Program
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#EFF6FF' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Programs
              </Typography>
              <Typography variant="h3" sx={{ color: '#1E40AF', fontWeight: 'bold' }}>
                {programs.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#DBEAFE' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Total Students
              </Typography>
              <Typography variant="h3" sx={{ color: '#1E40AF', fontWeight: 'bold' }}>
                {programs.reduce((sum, p) => sum + p.enrolled, 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#EFF6FF' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Active Enrollments
              </Typography>
              <Typography variant="h3" sx={{ color: '#1E40AF', fontWeight: 'bold' }}>
                {enrollments.filter((e) => e.status === 'active').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#DBEAFE' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Avg Rating
              </Typography>
              <Typography variant="h3" sx={{ color: '#1E40AF', fontWeight: 'bold' }}>
                {programs.length > 0
                  ? (
                      programs.reduce((sum, p) => sum + p.rating.average, 0) / programs.length
                    ).toFixed(1)
                  : '0.0'}
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
          <Tab label="Programs" />
          <Tab label="Active Students" />
          <Tab label="Completed" />
        </Tabs>

        {tabValue === 0 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#F8FAFC' }}>
                  <TableCell><strong>Title</strong></TableCell>
                  <TableCell><strong>Sport</strong></TableCell>
                  <TableCell><strong>Level</strong></TableCell>
                  <TableCell><strong>Enrolled</strong></TableCell>
                  <TableCell><strong>Price</strong></TableCell>
                  <TableCell><strong>Rating</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {programs.map((program) => (
                  <TableRow key={program._id}>
                    <TableCell>{program.title}</TableCell>
                    <TableCell>{program.sport}</TableCell>
                    <TableCell>
                      <Chip label={program.level} size="small" />
                    </TableCell>
                    <TableCell>
                      {program.enrolled}/{program.maxStudents}
                    </TableCell>
                    <TableCell>${program.price}</TableCell>
                    <TableCell>{program.rating.average.toFixed(1)} ⭐</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => {
                          setCurrentProgram(program);
                          setFormData(program);
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
                  <TableCell><strong>Student</strong></TableCell>
                  <TableCell><strong>Program</strong></TableCell>
                  <TableCell><strong>Start Date</strong></TableCell>
                  <TableCell><strong>Progress</strong></TableCell>
                  <TableCell><strong>Attendance</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {enrollments
                  .filter((enrollment) =>
                    tabValue === 1
                      ? ['active', 'paused'].includes(enrollment.status)
                      : enrollment.status === 'completed'
                  )
                  .map((enrollment) => (
                    <TableRow key={enrollment._id}>
                      <TableCell>{enrollment.user?.name}</TableCell>
                      <TableCell>{enrollment.program?.title}</TableCell>
                      <TableCell>
                        {new Date(enrollment.startDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{enrollment.progress?.skillLevel || 'N/A'}</TableCell>
                      <TableCell>
                        {enrollment.attendedSessions}/{enrollment.totalSessions}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={enrollment.status}
                          color={
                            enrollment.status === 'active'
                              ? 'success'
                              : enrollment.status === 'completed'
                              ? 'primary'
                              : 'warning'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Button size="small" startIcon={<AssessmentIcon />}>
                          Track
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{currentProgram ? 'Edit Program' : 'Create New Program'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Program Title"
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
                label="Level"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                SelectProps={{ native: true }}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="professional">Professional</option>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Duration (weeks)"
                value={formData.duration?.weeks || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration: { ...formData.duration, weeks: e.target.value },
                  })
                }
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Sessions/Week"
                value={formData.duration?.sessionsPerWeek || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration: { ...formData.duration, sessionsPerWeek: e.target.value },
                  })
                }
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Hours/Session"
                value={formData.duration?.hoursPerSession || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration: { ...formData.duration, hoursPerSession: e.target.value },
                  })
                }
              />
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
                label="Max Students"
                value={formData.maxStudents}
                onChange={(e) => setFormData({ ...formData, maxStudents: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Venue"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveProgram} sx={{ bgcolor: '#1E40AF' }}>
            {currentProgram ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CoachDashboard;
