import React, { useState } from 'react';
import { Box, Container, Typography, Card, IconButton, Avatar } from '@mui/material';
import Layout from '../components/Layout.js';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    { id: 1, name: "Benjamin Robert", role: "CEO & Co-Founder", image: "https://randomuser.me/api/portraits/men/32.jpg", text: "It is very satisfying to cooperate with this sports facility, because we are supplied with various types of sports energy for the sustainability of our health in running the business, very satisfying, thank you." },
    { id: 2, name: "Sarah Jenkins", role: "Professional Athlete", image: "https://randomuser.me/api/portraits/women/44.jpg", text: "The infrastructure here is world-class. I've trained in many places, but 5RINGS offers a unique blend of technology and traditional coaching that is hard to find elsewhere." },
    { id: 3, name: "Michael Chen", role: "Sports Enthusiast", image: "https://randomuser.me/api/portraits/men/85.jpg", text: "A perfect place for my kids to learn discipline and sportsmanship. The coaches are attentive and the environment is very safe and encouraging." }
  ];

  const nextTestimonial = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <Layout>
      <Box sx={{ pt: 12, bgcolor: '#FAFAFA', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          <Box sx={{ maxWidth: 900, mx: 'auto', textAlign: 'center', mb: 10 }}>
            <Typography variant="h1" fontWeight={900} sx={{ fontSize: { xs: '3rem', md: '4.5rem' }, mb: 3, color: '#1a1a1a' }}>
              Client{' '}
              <Box component="span" sx={{ position: 'relative', display: 'inline-block', '&::after': { content: '""', position: 'absolute', bottom: 8, left: 0, width: '100%', height: 12, bgcolor: 'rgba(0, 0, 0, 0.1)', zIndex: -1 } }}>
                Testimonials
              </Box>
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ fontSize: '1.25rem' }}>
              Explore our world-class facilities and athletic moments.
            </Typography>
          </Box>

          {/* Testimonial Carousel */}
          <Box sx={{ maxWidth: 900, mx: 'auto', mb: 15, position: 'relative', px: { xs: 8, md: 10 } }}>
            <Card elevation={0} sx={{ p: { xs: 4, md: 6 }, textAlign: 'center', bgcolor: 'white', border: '1px solid', borderColor: 'rgba(0, 0, 0, 0.08)', borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
              <Avatar src={testimonials[currentIndex].image} sx={{ width: 80, height: 80, mx: 'auto', mb: 3, border: '4px solid', borderColor: 'rgba(0, 0, 0, 0.08)' }} />
              <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>{testimonials[currentIndex].name}</Typography>
              <Typography variant="body2" sx={{ color: '#666', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, mb: 4 }}>{testimonials[currentIndex].role}</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic', lineHeight: 1.8, maxWidth: 700, mx: 'auto', fontSize: '1.1rem' }}>
                "{testimonials[currentIndex].text}"
              </Typography>
              <Box sx={{ width: 48, height: 4, bgcolor: '#1a1a1a', borderRadius: 2, mx: 'auto', mt: 4 }} />
            </Card>
            <IconButton onClick={prevTestimonial} sx={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', bgcolor: '#1a1a1a', color: 'white', '&:hover': { bgcolor: '#2a2a2a', transform: 'translateY(-50%) scale(1.1)' }, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', transition: 'all 0.3s ease' }}>
              <ChevronLeftIcon />
            </IconButton>
            <IconButton onClick={nextTestimonial} sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', bgcolor: '#1a1a1a', color: 'white', '&:hover': { bgcolor: '#2a2a2a', transform: 'translateY(-50%) scale(1.1)' }, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', transition: 'all 0.3s ease' }}>
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default Gallery;
