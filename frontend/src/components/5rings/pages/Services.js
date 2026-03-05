import React from 'react';
import { Box, Container, Typography, Card, Button, Chip, List, ListItem, ListItemText } from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import Layout from '../components/Layout.js';
import MessageIcon from '@mui/icons-material/Message';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const Services = () => {
  const WHATSAPP_NUMBER = '919876543210';

  const features = [
    { icon: <AccessTimeIcon sx={{ fontSize: 28 }} />, title: 'Flexible Timing', description: 'Book slots that fit your schedule' },
    { icon: <PeopleIcon sx={{ fontSize: 28 }} />, title: 'Expert Coaching', description: 'Learn from certified professionals' },
    { icon: <EmojiEventsIcon sx={{ fontSize: 28 }} />, title: 'Quality Facilities', description: 'World-class equipment & venues' }
  ];

  const ongoingServices = [
    { name: 'Football', type: 'Indoor', features: ['5-a-side matches', 'Professional turf', 'Night play'] },
    { name: 'Box Cricket', type: 'Indoor', features: ['Net practice', 'Match play', 'All ages'] },
    { name: 'Kickboxing', type: 'Indoor', features: ['Certified trainers', 'All levels', 'Personal training'] },
    { name: 'Mini Gym', type: 'Indoor', features: ['Modern equipment', 'Personal training', 'Cardio zone'] },
    { name: 'Table Tennis', type: 'Indoor', features: ['Competition tables', 'Coaching available', 'Tournaments'] },
    { name: 'Tennis', type: 'Indoor', features: ['Professional court', 'Equipment rental', 'Coaching'] },
    { name: 'Cricket', type: 'Outdoor', features: ['Practice nets', 'Match ground', 'Coaching'] },
    { name: 'Silambam', type: 'Outdoor', features: ['Traditional training', 'Expert masters', 'All levels'] },
    { name: 'Archery', type: 'Outdoor', features: ['Professional range', 'Equipment provided', 'Beginners welcome'] }
  ];

  const upcomingServices = [
    { name: 'Kalari', type: 'Indoor' },
    { name: 'Adimurai', type: 'Indoor' },
    { name: 'Cricket Nets', type: 'Outdoor' },
    { name: 'Volleyball', type: 'Outdoor' },
    { name: 'Kabaddi', type: 'Outdoor' },
    { name: 'Karate', type: 'Outdoor' }
  ];

  const getWhatsAppUrl = (serviceName) => {
    const message = `Hello 5RINGS, I would like to enquire about ${serviceName} services.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <Layout>
      <Box sx={{ pt: 12, bgcolor: '#FAFAFA', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          {/* Hero */}
          <Box sx={{ maxWidth: 900, mx: 'auto', textAlign: 'center', mb: 10 }}>
            <Typography variant="h1" fontWeight={900} sx={{ fontSize: { xs: '3rem', md: '4.5rem' }, mb: 3, color: '#1a1a1a' }}>
              Our{' '}
              <Box component="span" sx={{ position: 'relative', display: 'inline-block', '&::after': { content: '""', position: 'absolute', bottom: 8, left: 0, width: '100%', height: 12, bgcolor: 'rgba(0, 0, 0, 0.1)', zIndex: -1 } }}>
                Services
              </Box>
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ fontSize: '1.25rem' }}>
              Comprehensive sports services designed for athletes of all levels.
            </Typography>
          </Box>

          {/* Features */}
          <Grid container spacing={3} sx={{ mb: 12 }}>
            {features.map((feature) => (
              <Grid item xs={12} sm={4} key={feature.title}>
                <Card elevation={0} sx={{ p: 3, textAlign: 'center', bgcolor: 'white', border: '1px solid', borderColor: 'rgba(0, 0, 0, 0.08)', borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
                  <Box sx={{ color: '#1a1a1a', mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>{feature.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{feature.description}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Ongoing Services */}
          <Box sx={{ mb: 10 }}>
            <Typography variant="h2" fontWeight={900} sx={{ fontSize: { xs: '2rem', md: '3rem' }, mb: 6 }}>
              Ongoing Services
            </Typography>
            <Grid container spacing={4}>
              {ongoingServices.map((service) => (
                <Grid item xs={12} sm={6} lg={4} key={service.name}>
                  <Card
                    elevation={0}
                    sx={{
                      p: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: 'white',
                      border: '1px solid',
                      borderColor: 'rgba(0, 0, 0, 0.08)',
                      borderRadius: 3,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                      '&:hover': { borderColor: '#1a1a1a', transform: 'translateY(-4px)', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)' },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h5" fontWeight={700}>{service.name}</Typography>
                      <Chip label={service.type} size="small" sx={{ bgcolor: 'rgba(0, 0, 0, 0.05)', color: '#666', fontWeight: 600 }} />
                    </Box>
                    <List sx={{ mb: 2, flexGrow: 1 }}>
                      {service.features.map((feature) => (
                        <ListItem key={feature} sx={{ py: 0.5, px: 0 }}>
                          <FiberManualRecordIcon sx={{ fontSize: 8, color: '#1a1a1a', mr: 1.5 }} />
                          <ListItemText primary={feature} primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} />
                        </ListItem>
                      ))}
                    </List>
                    <Button variant="contained" fullWidth startIcon={<MessageIcon />} href={getWhatsAppUrl(service.name)} target="_blank" rel="noopener noreferrer" sx={{ bgcolor: '#25D366', color: 'white', textTransform: 'none', py: 1.5, borderRadius: 2, boxShadow: 'none', '&:hover': { bgcolor: '#1FAF56', boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)' }, transition: 'all 0.3s ease' }}>
                      Book Now
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Coming Soon */}
          <Box>
            <Typography variant="h2" fontWeight={900} sx={{ fontSize: { xs: '2rem', md: '3rem' }, mb: 6 }}>
              Coming Soon
            </Typography>
            <Grid container spacing={2}>
              {upcomingServices.map((service) => (
                <Grid item xs={6} sm={4} md={2} key={service.name}>
                  <Card elevation={0} sx={{ p: 3, textAlign: 'center', bgcolor: 'white', border: '1px dashed', borderColor: 'rgba(0, 0, 0, 0.2)', borderRadius: 3, opacity: 0.6 }}>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5, fontSize: '1rem' }}>{service.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{service.type}</Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default Services;
