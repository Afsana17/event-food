import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Typography, Link, IconButton, alpha } from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Footer = () => {
  const WHATSAPP_NUMBER = '919876543210';

  return (
    <Box component="footer" sx={{ bgcolor: '#1a1a1a', color: 'white', pt: 10, pb: 4, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Box component="img" src="/5rings.jpg" alt="5Rings" sx={{ height: 55, mb: 2.5 }} />
              <Typography variant="h5" fontWeight={800} sx={{ color: 'white', mb: 2, letterSpacing: 0.5 }}>
                5RINGS SPORTS
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.7, lineHeight: 1.8, maxWidth: 340 }}>
              Chennai's premier multi-sports organization dedicated to fostering athletic excellence and community wellness through world-class facilities and technology-driven solutions.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <IconButton href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" sx={{ bgcolor: alpha('#fff', 0.05), color: '#25D366', '&:hover': { bgcolor: '#25D366', color: 'white', transform: 'translateY(-4px)' }, transition: 'all 0.3s ease' }}>
                <WhatsAppIcon />
              </IconButton>
              <IconButton sx={{ bgcolor: alpha('#fff', 0.05), color: 'white', '&:hover': { bgcolor: '#3b5998', color: 'white', transform: 'translateY(-4px)' }, transition: 'all 0.3s ease' }}>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ bgcolor: alpha('#fff', 0.05), color: 'white', '&:hover': { bgcolor: '#1DA1F2', color: 'white', transform: 'translateY(-4px)' }, transition: 'all 0.3s ease' }}>
                <TwitterIcon />
              </IconButton>
              <IconButton sx={{ bgcolor: alpha('#fff', 0.05), color: 'white', '&:hover': { bgcolor: '#E1306C', color: 'white', transform: 'translateY(-4px)' }, transition: 'all 0.3s ease' }}>
                <InstagramIcon />
              </IconButton>
              <IconButton sx={{ bgcolor: alpha('#fff', 0.05), color: 'white', '&:hover': { bgcolor: '#0077b5', color: 'white', transform: 'translateY(-4px)' }, transition: 'all 0.3s ease' }}>
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 3.5, color: 'white', fontSize: '1.1rem' }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { text: 'Home', path: '/' },
                { text: 'About Us', path: '/about' },
                { text: 'Sports', path: '/sports' },
                { text: 'Services', path: '/services' },
                { text: 'Gallery', path: '/gallery' },
                { text: 'Contact', path: '/contact' }
              ].map((link) => (
                <Link
                  key={link.path}
                  component={RouterLink}
                  to={link.path}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    width: 'fit-content',
                    '&:hover': {
                      color: 'white',
                      paddingLeft: 1.5,
                      '&::before': {
                        width: '8px'
                      }
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 0,
                      height: '2px',
                      bgcolor: 'white',
                      transition: 'width 0.3s ease'
                    }
                  }}
                >
                  {link.text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Sports */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 3.5, color: 'white', fontSize: '1.1rem' }}>
              Sports
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {['Football', 'Cricket', 'Tennis', 'Kickboxing', 'Table Tennis', 'Silambam', 'Archery'].map((sport) => (
                <Typography key={sport} variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem' }}>
                  {sport}
                </Typography>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 3.5, color: 'white', fontSize: '1.1rem' }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <LocationOnIcon sx={{ fontSize: 20, color: 'rgba(255, 255, 255, 0.5)', mt: 0.3 }} />
                <Typography variant="body2" sx={{ opacity: 0.7, lineHeight: 1.7 }}>
                  FIVERINGS SPORTS PVT LTD<br />
                  Chennai, Tamil Nadu, India
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PhoneIcon sx={{ fontSize: 20, color: 'rgba(255, 255, 255, 0.5)' }} />
                <Link href="tel:+919876543210" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', '&:hover': { color: 'white' }, transition: 'all 0.3s ease' }}>
                  +91 9876543210
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <EmailIcon sx={{ fontSize: 20, color: 'rgba(255, 255, 255, 0.5)' }} />
                <Link href="mailto:info@5rings.in" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', '&:hover': { color: 'white' }, transition: 'all 0.3s ease' }}>
                  info@5rings.in
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <WhatsAppIcon sx={{ fontSize: 20, color: '#25D366' }} />
                <Link href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" sx={{ color: '#25D366', textDecoration: 'none', fontWeight: 600, '&:hover': { color: '#1FAF56' }, transition: 'all 0.3s ease' }}>
                  Chat on WhatsApp
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', mt: 8, pt: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            © {new Date().getFullYear()} FIVERINGS SPORTS PVT LTD. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Link href="#" sx={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: 'white' }, transition: 'all 0.3s ease' }}>
              Privacy Policy
            </Link>
            <Link href="#" sx={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: 'white' }, transition: 'all 0.3s ease' }}>
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
