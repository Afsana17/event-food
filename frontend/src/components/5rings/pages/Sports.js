import React from 'react';
import { Box, Container, Typography, Card, Button, Chip } from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import Layout from '../components/Layout.js';
import MessageIcon from '@mui/icons-material/Message';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';

const Sports = () => {
  const WHATSAPP_NUMBER = '919876543210';

  const sports = [
    { 
      name: 'Football', 
      icon: <SportsSoccerIcon />, 
      description: 'Experience indoor football with professional turf and lighting. Perfect for 5-a-side matches and training sessions.',
      type: 'Indoor',
      color: '#2E7D32'
    },
    { 
      name: 'Cricket', 
      icon: <SportsBaseballIcon />, 
      description: 'World-class cricket facilities including nets, practice pitches, and box cricket for all skill levels.',
      type: 'Outdoor',
      color: '#01579B'
    },
    { 
      name: 'Tennis', 
      icon: <SportsTennisIcon />, 
      description: 'Professional tennis courts with quality surfaces and equipment for singles and doubles play.',
      type: 'Indoor',
      color: '#F57C00'
    },
    { 
      name: 'Kick Boxing', 
      icon: <SportsMartialArtsIcon />, 
      description: 'Train with certified instructors in our fully-equipped kickboxing studio with premium gear.',
      type: 'Indoor',
      color: '#C62828'
    },
    { 
      name: 'Table Tennis', 
      icon: <SportsEsportsIcon />, 
      description: 'Competition-grade tables and equipment for recreational and professional table tennis players.',
      type: 'Indoor',
      color: '#6A1B9A'
    },
    { 
      name: 'Silambam', 
      icon: <SportsMartialArtsIcon />, 
      description: 'Learn the ancient Tamil martial art of Silambam from experienced masters.',
      type: 'Outdoor',
      color: '#D84315'
    },
    { 
      name: 'Archery', 
      icon: <GolfCourseIcon />, 
      description: 'Precision archery training with professional equipment and expert guidance.',
      type: 'Outdoor',
      color: '#5D4037'
    }
  ];

  const getWhatsAppUrl = (sportName) => {
    const message = `Hello 5RINGS, I would like to enquire about ${sportName} facilities.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <Layout>
      <Box sx={{ pt: 12, bgcolor: '#FAFAFA', minHeight: '100vh' }}>
        {/* Hero Section */}
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          <Box sx={{ maxWidth: 900, mx: 'auto', textAlign: 'center', mb: 10 }}>
            <Typography variant="h1" fontWeight={900} sx={{ fontSize: { xs: '3rem', md: '4.5rem' }, mb: 3, color: '#1a1a1a' }}>
              Our{' '}
              <Box component="span" sx={{ position: 'relative', display: 'inline-block', '&::after': { content: '""', position: 'absolute', bottom: 8, left: 0, width: '100%', height: 12, bgcolor: 'rgba(0, 0, 0, 0.1)', zIndex: -1 } }}>
                Sports
              </Box>
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ fontSize: '1.25rem' }}>
              Discover our diverse range of world-class sports facilities.
            </Typography>
          </Box>

          {/* Sports Grid */}
          <Grid container spacing={3}>
            {sports.map((sport) => (
              <Grid item xs={12} sm={6} md={4} key={sport.name}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'white',
                    border: '1px solid',
                    borderColor: 'rgba(0, 0, 0, 0.08)',
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                    '&:hover': {
                      borderColor: '#1a1a1a',
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
                      '& .sport-icon-box': {
                        transform: 'scale(1.1)'
                      }
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {/* Icon Header */}
                  <Box
                    sx={{
                      height: 120,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      bgcolor: '#f5f5f5',
                      color: sport.color
                    }}
                  >
                    <Box
                      className="sport-icon-box"
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'rgba(0, 0, 0, 0.04)',
                        transition: 'transform 0.3s ease',
                        '& svg': { fontSize: 32 }
                      }}
                    >
                      {sport.icon}
                    </Box>
                    <Chip
                      label={sport.type}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'white',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        height: 20,
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </Box>

                  {/* Content */}
                  <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', height: 'calc(100% - 120px)', justifyContent: 'space-between' }}>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, fontSize: '1rem', lineHeight: 1.3, textAlign: 'center' }}>
                      {sport.name}
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<MessageIcon sx={{ fontSize: 18 }} />}
                      href={getWhatsAppUrl(sport.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        bgcolor: '#25D366',
                        color: 'white',
                        textTransform: 'none',
                        fontSize: '0.85rem',
                        py: 1.2,
                        borderRadius: 2,
                        boxShadow: 'none',
                        '&:hover': {
                          bgcolor: '#1FAF56',
                          boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Enquire Now
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

export default Sports;
