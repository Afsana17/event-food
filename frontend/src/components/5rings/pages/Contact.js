import React from 'react';
import { Box, Container, Typography, Card, Button } from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import Layout from '../components/Layout.js';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Contact = () => {
  const WHATSAPP_NUMBER = '919876543210';

  const contacts = [
    { icon: <PhoneIcon sx={{ fontSize: 32 }} />, title: 'Phone', value: '+91 9876543210', href: 'tel:+919876543210' },
    { icon: <EmailIcon sx={{ fontSize: 32 }} />, title: 'Email', value: 'info@5rings.in', href: 'mailto:info@5rings.in' },
    { icon: <AccessTimeIcon sx={{ fontSize: 32 }} />, title: 'Hours', value: 'Mon-Sun: 6 AM - 10 PM', href: null }
  ];

  return (
    <Layout>
      <Box sx={{ pt: 12, bgcolor: '#FAFAFA', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          {/* Hero */}
          <Box sx={{ maxWidth: 900, mx: 'auto', textAlign: 'center', mb: 10 }}>
            <Typography variant="h1" fontWeight={900} sx={{ fontSize: { xs: '3rem', md: '4.5rem' }, mb: 3 }}>
              Get in{' '}
              <Box component="span" sx={{ background: 'linear-gradient(135deg, #FFC107 0%, #FFD54F 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Touch
              </Box>
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ fontSize: '1.25rem' }}>
              Ready to start your sports journey? We're here to help!
            </Typography>
          </Box>

          {/* WhatsApp CTA */}
          <Card elevation={0} sx={{ p: { xs: 4, md: 6 }, mb: 8, textAlign: 'center', bgcolor: 'rgba(37, 211, 102, 0.05)', backdropFilter: 'blur(20px)', border: '2px solid', borderColor: '#25D366', borderRadius: 4 }}>
            <WhatsAppIcon sx={{ fontSize: 64, color: '#25D366', mb: 2 }} />
            <Typography variant="h3" fontWeight={900} sx={{ mb: 2 }}>
              Chat with Us on WhatsApp
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
              The fastest way to reach us! Get instant responses to your queries about facilities, bookings, and programs.
            </Typography>
            <Button variant="contained" size="large" startIcon={<WhatsAppIcon />} href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" sx={{ bgcolor: '#25D366', color: 'white', px: 6, py: 2, fontSize: '1.1rem', textTransform: 'none', '&:hover': { bgcolor: '#1FAF56' } }}>
              Start Conversation
            </Button>
          </Card>

          {/* Other Contact Methods */}
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {contacts.map((contact) => (
              <Grid item xs={12} md={4} key={contact.title}>
                <Card elevation={0} sx={{ p: 4, textAlign: 'center', height: '100%', bgcolor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(20px)', border: '1px solid', borderColor: 'divider', borderRadius: 4, '&:hover': { borderColor: '#FFC107', transform: 'translateY(-4px)' }, transition: 'all 0.3s ease' }}>
                  <Box sx={{ color: '#FFC107', mb: 2 }}>{contact.icon}</Box>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>{contact.title}</Typography>
                  {contact.href ? (
                    <Typography component="a" href={contact.href} variant="body1" color="primary" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                      {contact.value}
                    </Typography>
                  ) : (
                    <Typography variant="body1" color="text.secondary">{contact.value}</Typography>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Location */}
          <Card elevation={0} sx={{ p: { xs: 4, md: 6 }, bgcolor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(20px)', border: '1px solid', borderColor: 'divider', borderRadius: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOnIcon sx={{ fontSize: 32, color: '#FFC107', mr: 2 }} />
              <Typography variant="h4" fontWeight={900}>
                Our Location
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              FIVERINGS SPORTS PVT LTD
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Chennai, Tamil Nadu, India
            </Typography>
          </Card>
        </Container>
      </Box>
    </Layout>
  );
};

export default Contact;
