import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  Chip,
  Stack,
  alpha,
  Avatar,
  Fade,
  Zoom,
  Slide,
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import Layout from '../components/Layout.js';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import GroupsIcon from '@mui/icons-material/Groups';
import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import WifiIcon from '@mui/icons-material/Wifi';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ShieldIcon from '@mui/icons-material/Shield';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleIcon from '@mui/icons-material/People';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const Home = () => {
  const [stats, setStats] = useState({
    athletes: 0,
    events: 0,
    sports: 0,
    years: 0
  });
  const [animationStarted, setAnimationStarted] = useState(false);

  // Animated counter effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationStarted) {
          setAnimationStarted(true);
          
          const finalStats = {
            athletes: 1000,
            events: 150,
            sports: 7,
            years: 6
          };
          
          const duration = 2000;
          const steps = 60;
          const increment = duration / steps;
          
          Object.keys(finalStats).forEach(key => {
            const target = finalStats[key];
            const stepValue = target / steps;
            let current = 0;
            
            const timer = setInterval(() => {
              current += stepValue;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              
              setStats(prev => ({
                ...prev,
                [key]: Math.floor(current)
              }));
            }, increment);
          });
        }
      },
      { threshold: 0.3 }
    );
    
    const statsElement = document.getElementById('stats-section');
    if (statsElement) {
      observer.observe(statsElement);
    }
    
    return () => {
      if (statsElement) {
        observer.unobserve(statsElement);
      }
    };
  }, [animationStarted]);

  const sports = [
    { name: 'Football', icon: <SportsSoccerIcon sx={{ fontSize: 48 }} />, color: '#2E7D32' },
    { name: 'Cricket', icon: <SportsCricketIcon sx={{ fontSize: 48 }} />, color: '#1976D2' },
    { name: 'Tennis', icon: <SportsTennisIcon sx={{ fontSize: 48 }} />, color: '#7B1FA2' },
    { name: 'Kickboxing', icon: <SportsKabaddiIcon sx={{ fontSize: 48 }} />, color: '#C62828' },
    { name: 'Table Tennis', icon: <SportsBaseballIcon sx={{ fontSize: 48 }} />, color: '#F57C00' },
    { name: 'Basketball', icon: <SportsBasketballIcon sx={{ fontSize: 48 }} />, color: '#FF6F00' },
    { name: 'Volleyball', icon: <SportsVolleyballIcon sx={{ fontSize: 48 }} />, color: '#0097A7' },
  ];

  const facilities = [
    {
      icon: <FitnessCenterIcon sx={{ fontSize: 32 }} />,
      title: 'World-Class Equipment',
      description: 'Professional-grade sports equipment and training facilities.'
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 32 }} />,
      title: 'Expert Coaching',
      description: 'Certified coaches and trainers for personalized guidance.'
    },
    {
      icon: <ShieldIcon sx={{ fontSize: 32 }} />,
      title: 'Safety First',
      description: 'Comprehensive safety measures and first-aid facilities.'
    },
    {
      icon: <ScheduleIcon sx={{ fontSize: 32 }} />,
      title: 'Flexible Hours',
      description: 'Extended operating hours to fit your schedule.'
    },
    {
      icon: <WifiIcon sx={{ fontSize: 32 }} />,
      title: 'Smart Facilities',
      description: 'Tech-enabled booking and training tracking systems.'
    },
    {
      icon: <LocalParkingIcon sx={{ fontSize: 32 }} />,
      title: 'Ample Parking',
      description: 'Convenient parking space for all visitors.'
    }
  ];

  const milestones = [
    { year: '2018', title: 'Sports Industry Entry', description: 'Started our journey in the sports industry with a vision to transform athletic training.' },
    { year: 'Dec 2021', title: 'Philosophy Established', description: 'Formulated our core philosophy centered on inclusive sports access for everyone.' },
    { year: '2024', title: 'Multi Sports Facility', description: 'Inaugurated our state-of-the-art multi-sports facility.' },
    { year: '2025', title: 'Sports Tech Initiative', description: 'Launched cutting-edge sports technology solutions for training and management.' },
    { year: 'Future', title: 'Expansion', description: 'Growing presence with new facilities and programs.' }
  ];

  const ongoingIndoor = ['Football', 'Box Cricket', 'Kickboxing', 'Mini Gym', 'Table Tennis', 'Tennis'];
  const ongoingOutdoor = ['Cricket', 'Silambam', 'Archery'];
  const upcomingIndoor = ['Kalari', 'Adimurai'];
  const upcomingOutdoor = ['Cricket Nets', 'Volleyball', 'Kabaddi', 'Karate'];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Football Coach",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "The facilities at 5RINGS are world-class. My students have improved tremendously with the professional equipment and expert guidance provided here.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Tennis Player",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      text: "As a professional tennis player, I've trained at many facilities. 5RINGS stands out for its dedication to excellence and athlete-focused approach.",
      rating: 5
    },
    {
      name: "Vikram Singh",
      role: "Cricket Academy Owner",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      text: "The cricket facilities here are exceptional. The infrastructure and coaching quality have helped produce some outstanding young talents.",
      rating: 5
    }
  ];

  const teamMembers = [
    {
      name: "Ashok Kumar H",
      role: "Founder & CEO",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
      description: "Visionary leader with 15+ years in sports management"
    },
    {
      name: "Suriyaraaj K",
      role: "Technical Director",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
      description: "Sports technology expert and former national level athlete"
    },
    {
      name: "Rishi Kumar",
      role: "Operations Manager",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
      description: "Ensuring seamless operations and athlete satisfaction"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #FAFAFA 0%, #EEEEEE 100%)',
          pt: 10,
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'url(/5rings.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.03,
            pointerEvents: 'none'
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, pt: 12 }}>
          <Box sx={{ maxWidth: 900 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.5,
                px: 3,
                py: 1.5,
                mb: 5,
                borderRadius: 8,
                bgcolor: 'white',
                border: '1px solid',
                borderColor: 'rgba(0, 0, 0, 0.08)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: '#1a1a1a',
                  animation: 'pulse 2s ease-in-out infinite'
                }}
              />
              <Typography variant="body2" fontWeight={600} letterSpacing={1} sx={{ color: '#1a1a1a', fontSize: '0.85rem' }}>
                MULTI SPORTS & SPORTS TECHNOLOGY
              </Typography>
            </Box>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '3rem', sm: '4rem', md: '5.5rem' },
                fontWeight: 900,
                lineHeight: 1.1,
                mb: 3,
                color: '#1a1a1a',
                letterSpacing: -2
              }}
            >
              Welcome to{' '}
              <Box
                component="span"
                sx={{
                  color: '#1a1a1a',
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 8,
                    left: 0,
                    width: '100%',
                    height: 12,
                    bgcolor: alpha('#1a1a1a', 0.1),
                    zIndex: -1
                  }
                }}
              >
                5RINGS
              </Box>
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 400,
                color: '#1a1a1a',
                mb: 2
              }}
            >
              Everyone is our customer
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                fontWeight: 400,
                color: '#666',
                maxWidth: 700,
                lineHeight: 1.8,
                mb: 6
              }}
            >
              A comprehensive multi-sports ecosystem combining world-class facilities with cutting-edge sports technology to nurture athletic excellence and community wellness.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 10 }}>
              <Button
                component={RouterLink}
                to="/sports"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  bgcolor: '#1a1a1a',
                  color: 'white',
                  textTransform: 'none',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                  '&:hover': {
                    bgcolor: '#2a2a2a',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2)'
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                Explore Sports
              </Button>

              <Button
                href="https://wa.me/919876543210?text=Hello%205RINGS%2C%20I%20would%20like%20to%20know%20more%20about%20your%20sports%20facilities%20and%20services."
                target="_blank"
                variant="outlined"
                size="large"
                startIcon={<WhatsAppIcon />}
                sx={{
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  color: '#25D366',
                  borderColor: '#25D366',
                  borderWidth: 2,
                  textTransform: 'none',
                  '&:hover': {
                    borderWidth: 2,
                    bgcolor: alpha('#25D366', 0.08),
                    borderColor: '#25D366',
                    transform: 'translateY(-4px)'
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                Chat on WhatsApp
              </Button>
            </Stack>

            <Grid container spacing={3}>
              {[
                { value: '7+', label: 'Sports' },
                { value: '2018', label: 'Since' },
                { value: '1000+', label: 'Athletes' }
              ].map((stat, idx) => (
                <Grid item xs={12} sm={4} key={idx}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 900,
                      color: '#1a1a1a',
                      mb: 1,
                      textAlign: { xs: 'center', sm: 'left' }
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: '#666', fontWeight: 500, textAlign: { xs: 'center', sm: 'left' } }}
                  >
                    {stat.label}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>

        <Box
          sx={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'float 3s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translate(-50%, 0)' },
              '50%': { transform: 'translate(-50%, -10px)' }
            }
          }}
        >
          <Box
            sx={{
              width: 24,
              height: 40,
              borderRadius: 10,
              border: '2px solid',
              borderColor: alpha('#fff', 0.3),
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              p: 1
            }}
          >
            <Box
              sx={{
                width: 4,
                height: 8,
                borderRadius: 2,
                bgcolor: '#FFC107',
                animation: 'scroll 2s ease-in-out infinite',
                '@keyframes scroll': {
                  '0%': { opacity: 1, transform: 'translateY(0)' },
                  '100%': { opacity: 0, transform: 'translateY(16px)' }
                }
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Journey Section */}
      <Box sx={{ bgcolor: 'white', py: { xs: 10, md: 16 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="h2" fontWeight={900} sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 2, color: '#1a1a1a' }}>
              Our Journey
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              From a vision to a multi-sports empire, discover the milestones that shaped 5RINGS.
            </Typography>
          </Box>

          <Box sx={{ position: 'relative' }}>
            <Box
              sx={{
                display: { xs: 'none', md: 'block' },
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: 2,
                bgcolor: 'divider',
                transform: 'translateX(-50%)'
              }}
            />

            <Stack spacing={8}>
              {milestones.map((milestone, index) => (
                <Box
                  key={milestone.year}
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: index % 2 === 0 ? 'row' : 'row-reverse' },
                    alignItems: 'center',
                    gap: 4
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      textAlign: { xs: 'center', md: index % 2 === 0 ? 'right' : 'left' }
                    }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        p: 4,
                        bgcolor: 'white',
                        border: '1px solid',
                        borderColor: 'rgba(0, 0, 0, 0.08)',
                        borderRadius: 3,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                        '&:hover': {
                          borderColor: 'rgba(0, 0, 0, 0.2)',
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)'
                        },
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    >
                      <Typography variant="h6" fontWeight={700} color="#1a1a1a" sx={{ mb: 1 }}>
                        {milestone.year}
                      </Typography>
                      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
                        {milestone.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {milestone.description}
                      </Typography>
                    </Card>
                  </Box>

                  <Box
                    sx={{
                      display: { xs: 'none', md: 'flex' },
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10
                    }}
                  >
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        bgcolor: '#1a1a1a',
                        border: '4px solid white',
                        boxShadow: '0 0 0 4px rgba(0, 0, 0, 0.08)'
                      }}
                    />
                  </Box>

                  <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' } }} />
                </Box>
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Vision & Mission */}
      <Container maxWidth="lg" sx={{ py: { xs: 10, md: 16 }, bgcolor: '#FAFAFA' }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Card
              elevation={0}
              sx={{
                p: 5,
                height: '100%',
                bgcolor: 'white',
                border: '1px solid',
                borderColor: 'rgba(0, 0, 0, 0.08)',
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                '&:hover': {
                  borderColor: 'rgba(0, 0, 0, 0.2)',
                  transform: 'scale(1.02)',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)',
                  '& .vision-icon': {
                    transform: 'scale(1.1)'
                  }
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <Box
                className="vision-icon"
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: alpha('#1a1a1a', 0.05),
                  color: '#1a1a1a',
                  mb: 4,
                  transition: 'transform 0.3s ease'
                }}
              >
                <VisibilityIcon sx={{ fontSize: 32 }} />
              </Box>
              <Typography variant="h4" fontWeight={900} sx={{ mb: 3 }}>
                Our Vision
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                To become India's most trusted multi-sports organization, creating a holistic ecosystem that nurtures athletic talent, promotes wellness, and leverages technology to revolutionize the sports industry.
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              elevation={0}
              sx={{
                p: 5,
                height: '100%',
                bgcolor: 'white',
                border: '1px solid',
                borderColor: 'rgba(0, 0, 0, 0.08)',
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                '&:hover': {
                  borderColor: 'rgba(0, 0, 0, 0.2)',
                  transform: 'scale(1.02)',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)',
                  '& .mission-icon': {
                    transform: 'scale(1.1)'
                  }
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <Box
                className="mission-icon"
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: alpha('#1a1a1a', 0.05),
                  color: '#1a1a1a',
                  mb: 4,
                  transition: 'transform 0.3s ease'
                }}
              >
                <TrackChangesIcon sx={{ fontSize: 32 }} />
              </Box>
              <Typography variant="h4" fontWeight={900} sx={{ mb: 3 }}>
                Our Mission
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                To provide world-class sports facilities and technology-driven solutions that make quality athletic training accessible to everyone, fostering a community of champions and promoting a healthy lifestyle.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Sports Available */}
      <Box sx={{ bgcolor: 'white', py: { xs: 10, md: 16 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="h2" fontWeight={900} sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 2, color: '#1a1a1a' }}>
              Sports Available
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              Explore our diverse range of sports facilities, from traditional athletics to martial arts.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {sports.map((sport, index) => (
              <Grid
                item
                xs={6}
                sm={4}
                md={index === 0 ? 6 : 3}
                key={sport.name}
              >
                <Card
                  elevation={0}
                  sx={{
                    position: 'relative',
                    aspectRatio: index === 0 ? '16/9' : '4/5',
                    borderRadius: 3,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: 'rgba(0, 0, 0, 0.08)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      zIndex: 1,
                      background: `linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 60%)`,
                      transition: 'all 0.3s ease'
                    },
                    '&:hover': {
                      borderColor: '#1a1a1a',
                      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
                      '&::before': {
                        background: `linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 70%)`
                      },
                      '& .sport-bg': {
                        transform: 'scale(1.1)'
                      }
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <Box
                    className="sport-bg"
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      bgcolor: '#f5f5f5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.5s ease',
                      color: sport.color,
                      opacity: 0.15
                    }}
                  >
                    {sport.icon}
                  </Box>

                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 3,
                      zIndex: 2
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{
                        color: 'white',
                        fontSize: index === 0 ? '1.5rem' : '1.1rem'
                      }}
                    >
                      {sport.name}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Facility Features */}
      <Container maxWidth="lg" sx={{ py: { xs: 10, md: 16 }, bgcolor: '#FAFAFA' }}>
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography variant="h2" fontWeight={900} sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 2, color: '#1a1a1a' }}>
            Facility Features
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Experience premium amenities designed for optimal athletic performance.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {facilities.map((facility, index) => (
            <Grid item xs={12} sm={6} md={4} key={facility.title}>
              <Card
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  bgcolor: 'white',
                  border: '1px solid',
                  borderColor: 'rgba(0, 0, 0, 0.08)',
                  borderRadius: 3,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  '&:hover': {
                    borderColor: 'rgba(0, 0, 0, 0.2)',
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)',
                    '& .facility-icon': {
                      transform: 'scale(1.1)',
                      bgcolor: '#1a1a1a',
                      color: 'white'
                    }
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <Box
                  className="facility-icon"
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: alpha('#1a1a1a', 0.05),
                    color: '#1a1a1a',
                    mb: 3,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {facility.icon}
                </Box>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                  {facility.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {facility.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Services Section */}
      <Box sx={{ bgcolor: 'white', py: { xs: 10, md: 16 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="h2" fontWeight={900} sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 2, color: '#1a1a1a' }}>
              Our Services
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              Comprehensive sports services tailored for athletes of all levels.
            </Typography>
          </Box>

          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Card
                elevation={0}
                sx={{
                  p: 5,
                  height: '100%',
                  bgcolor: 'white',
                  border: '1px solid',
                  borderColor: 'rgba(0, 0, 0, 0.08)',
                  borderRadius: 3,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: '#1a1a1a'
                    }}
                  />
                  <Typography variant="h4" fontWeight={900}>
                    Ongoing Services
                  </Typography>
                </Stack>

                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle2" fontWeight={700} color="#1a1a1a" sx={{ mb: 2.5, letterSpacing: 1 }}>
                    INDOOR
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {ongoingIndoor.map((service) => (
                      <Chip
                        key={service}
                        label={service}
                        icon={<WhatsAppIcon sx={{ fontSize: 16 }} />}
                        component="a"
                        href={`https://wa.me/919876543210?text=Hello%205RINGS%2C%20I%20would%20like%20to%20enquire%20about%20${encodeURIComponent(service)}%20services.`}
                        target="_blank"
                        clickable
                        sx={{
                          px: 2.5,
                          py: 3,
                          borderRadius: 2,
                          bgcolor: alpha('#000', 0.03),
                          border: '1px solid',
                          borderColor: 'rgba(0, 0, 0, 0.08)',
                          fontSize: '0.9rem',
                          fontWeight: 500,
                          '&:hover': {
                            borderColor: '#1a1a1a',
                            bgcolor: '#1a1a1a',
                            color: 'white',
                            '& .MuiChip-icon': {
                              color: '#25D366'
                            }
                          },
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                <Box>
                  <Typography variant="subtitle2" fontWeight={700} color="#1a1a1a" sx={{ mb: 2.5, letterSpacing: 1 }}>
                    OUTDOOR
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {ongoingOutdoor.map((service) => (
                      <Chip
                        key={service}
                        label={service}
                        icon={<WhatsAppIcon sx={{ fontSize: 16 }} />}
                        component="a"
                        href={`https://wa.me/919876543210?text=Hello%205RINGS%2C%20I%20would%20like%20to%20enquire%20about%20${encodeURIComponent(service)}%20services.`}
                        target="_blank"
                        clickable
                        sx={{
                          px: 2.5,
                          py: 3,
                          borderRadius: 2,
                          bgcolor: alpha('#000', 0.03),
                          border: '1px solid',
                          borderColor: 'rgba(0, 0, 0, 0.08)',
                          fontSize: '0.9rem',
                          fontWeight: 500,
                          '&:hover': {
                            borderColor: '#1a1a1a',
                            bgcolor: '#1a1a1a',
                            color: 'white',
                            '& .MuiChip-icon': {
                              color: '#25D366'
                            }
                          },
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card
                elevation={0}
                sx={{
                  p: 5,
                  height: '100%',
                  bgcolor: 'white',
                  border: '1px solid',
                  borderColor: 'rgba(0, 0, 0, 0.08)',
                  borderRadius: 3,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: 'text.secondary'
                    }}
                  />
                  <Typography variant="h4" fontWeight={900}>
                    Upcoming Services
                  </Typography>
                </Stack>

                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle2" fontWeight={700} color="text.secondary" sx={{ mb: 2.5, letterSpacing: 1 }}>
                    INDOOR
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {upcomingIndoor.map((service) => (
                      <Chip
                        key={service}
                        label={service}
                        sx={{
                          px: 2.5,
                          py: 3,
                          borderRadius: 2,
                          bgcolor: alpha('#000', 0.02),
                          border: '1px dashed',
                          borderColor: 'rgba(0, 0, 0, 0.15)',
                          color: 'text.secondary',
                          fontSize: '0.9rem',
                          fontWeight: 500
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                <Box>
                  <Typography variant="subtitle2" fontWeight={700} color="text.secondary" sx={{ mb: 2.5, letterSpacing: 1 }}>
                    OUTDOOR
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {upcomingOutdoor.map((service) => (
                      <Chip
                        key={service}
                        label={service}
                        sx={{
                          px: 2.5,
                          py: 3,
                          borderRadius: 2,
                          bgcolor: alpha('#000', 0.02),
                          border: '1px dashed',
                          borderColor: 'rgba(0, 0, 0, 0.15)',
                          color: 'text.secondary',
                          fontSize: '0.9rem',
                          fontWeight: 500
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Statistics Section with Animation */}
      <Box id="stats-section" sx={{ bgcolor: '#1a1a1a', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" fontWeight={900} sx={{ 
              fontSize: { xs: '2rem', md: '3rem' }, 
              mb: 2, 
              color: 'white' 
            }}>
              Our Impact in Numbers
            </Typography>
            <Typography variant="h6" color="rgba(255,255,255,0.7)" sx={{ 
              maxWidth: 700, 
              mx: 'auto' 
            }}>
              Building champions and transforming lives through sports excellence
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Zoom in={animationStarted} style={{ transitionDelay: '100ms' }}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: alpha('#fff', 0.1),
                    mb: 3,
                    mx: 'auto',
                    border: '2px solid rgba(255,255,255,0.2)'
                  }}>
                    <PeopleIcon sx={{ fontSize: 36, color: 'white' }} />
                  </Box>
                </Zoom>
                <Typography variant="h3" fontWeight={900} sx={{ 
                  color: 'white', 
                  mb: 1,
                  fontFamily: 'monospace'
                }}>
                  {stats.athletes}+
                </Typography>
                <Typography variant="h6" color="rgba(255,255,255,0.8)">
                  Athletes Trained
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Zoom in={animationStarted} style={{ transitionDelay: '200ms' }}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: alpha('#fff', 0.1),
                    mb: 3,
                    mx: 'auto',
                    border: '2px solid rgba(255,255,255,0.2)'
                  }}>
                    <EmojiEventsIcon sx={{ fontSize: 36, color: 'white' }} />
                  </Box>
                </Zoom>
                <Typography variant="h3" fontWeight={900} sx={{ 
                  color: 'white', 
                  mb: 1,
                  fontFamily: 'monospace'
                }}>
                  {stats.events}+
                </Typography>
                <Typography variant="h6" color="rgba(255,255,255,0.8)">
                  Events Organized
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Zoom in={animationStarted} style={{ transitionDelay: '300ms' }}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: alpha('#fff', 0.1),
                    mb: 3,
                    mx: 'auto',
                    border: '2px solid rgba(255,255,255,0.2)'
                  }}>
                    <SportsSoccerIcon sx={{ fontSize: 36, color: 'white' }} />
                  </Box>
                </Zoom>
                <Typography variant="h3" fontWeight={900} sx={{ 
                  color: 'white', 
                  mb: 1,
                  fontFamily: 'monospace'
                }}>
                  {stats.sports}
                </Typography>
                <Typography variant="h6" color="rgba(255,255,255,0.8)">
                  Sports Available
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Zoom in={animationStarted} style={{ transitionDelay: '400ms' }}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: alpha('#fff', 0.1),
                    mb: 3,
                    mx: 'auto',
                    border: '2px solid rgba(255,255,255,0.2)'
                  }}>
                    <TrendingUpIcon sx={{ fontSize: 36, color: 'white' }} />
                  </Box>
                </Zoom>
                <Typography variant="h3" fontWeight={900} sx={{ 
                  color: 'white', 
                  mb: 1,
                  fontFamily: 'monospace'
                }}>
                  {stats.years}
                </Typography>
                <Typography variant="h6" color="rgba(255,255,255,0.8)">
                  Years Experience
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ bgcolor: '#f8fafc', py: { xs: 10, md: 16 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="h2" fontWeight={900} sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' }, 
              mb: 2, 
              color: '#1a1a1a' 
            }}>
              What Our Athletes Say
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ 
              maxWidth: 700, 
              mx: 'auto' 
            }}>
              Hear from the champions who train at 5RINGS Sports
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={testimonial.name}>
                <Fade in={true} style={{ transitionDelay: `${index * 200}ms` }}>
                  <Card sx={{
                    p: 4,
                    height: '100%',
                    bgcolor: 'white',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: 3,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
                    },
                    transition: 'all 0.3s ease'
                  }}>
                    <Box sx={{
                      position: 'absolute',
                      top: -10,
                      left: 20,
                      width: 40,
                      height: 40,
                      bgcolor: 'primary.main',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <FormatQuoteIcon sx={{ color: 'white', fontSize: 20 }} />
                    </Box>

                    <Box sx={{ pt: 2, mb: 3 }}>
                      <Box sx={{ display: 'flex', mb: 2 }}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <StarIcon key={i} sx={{ color: '#FFC107', fontSize: 20 }} />
                        ))}
                      </Box>
                      <Typography variant="body1" sx={{
                        lineHeight: 1.7,
                        color: 'text.secondary',
                        fontSize: '1rem',
                        fontStyle: 'italic'
                      }}>
                        "{testimonial.text}"
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        sx={{ width: 50, height: 50, mr: 3 }}
                      />
                      <Box>
                        <Typography variant="h6" fontWeight={700}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Box sx={{ bgcolor: 'white', py: { xs: 10, md: 16 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="h2" fontWeight={900} sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' }, 
              mb: 2, 
              color: '#1a1a1a' 
            }}>
              Meet Our Team
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ 
              maxWidth: 700, 
              mx: 'auto' 
            }}>
              The passionate professionals driving sports excellence
            </Typography>
          </Box>

          <Grid container spacing={6}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} md={4} key={member.name}>
                <Slide direction="up" in={true} style={{ transitionDelay: `${index * 200}ms` }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar 
                      src={member.avatar}
                      alt={member.name}
                      sx={{ 
                        width: 120, 
                        height: 120, 
                        mx: 'auto', 
                        mb: 3,
                        border: '4px solid #f0f0f0',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          borderColor: 'primary.main'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    />
                    <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
                      {member.name}
                    </Typography>
                    <Typography variant="h6" color="primary.main" sx={{ mb: 2, fontWeight: 600 }}>
                      {member.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {member.description}
                    </Typography>
                  </Box>
                </Slide>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: '#1a1a1a',
          py: { xs: 10, md: 16 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Stack spacing={4} alignItems="center">
            <Typography
              variant="h2"
              fontWeight={900}
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                color: 'white',
                mb: 2
              }}
            >
              Ready to Start Your Journey?
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: alpha('#fff', 0.7),
                maxWidth: 650,
                lineHeight: 1.8
              }}
            >
              Join thousands of athletes training at 5RINGS Sports and unlock your full potential today!
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ pt: 2 }}>
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                size="large"
                sx={{
                  px: 6,
                  py: 2.5,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderRadius: 2,
                  bgcolor: 'white',
                  color: '#1a1a1a',
                  boxShadow: 'none',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(255, 255, 255, 0.15)'
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                Register Now
              </Button>

              <Button
                component={RouterLink}
                to="/contact"
                variant="outlined"
                size="large"
                sx={{
                  px: 6,
                  py: 2.5,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderRadius: 2,
                  color: 'white',
                  borderColor: alpha('#fff', 0.3),
                  borderWidth: 2,
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: 'white',
                    borderWidth: 2,
                    bgcolor: alpha('#fff', 0.1),
                    transform: 'translateY(-4px)'
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                Contact Us
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Layout>
  );
};

export default Home;
