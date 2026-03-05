import { createTheme } from '@mui/material/styles';

const sportTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1E40AF',
      light: '#3B82F6',
      dark: '#1E3A8A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#0EA5E9',
      light: '#38BDF8',
      dark: '#0284C7',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#DC2626',
      light: '#EF4444',
      dark: '#B91C1C',
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
    },
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E293B',
      secondary: '#64748B',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Segoe UI", "Helvetica Neue", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '2.75rem',
      letterSpacing: '-1px',
      color: '#1E40AF',
      '@media (max-width:600px)': {
        fontSize: '2rem'
      }
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      letterSpacing: '-0.3px',
      color: '#1E40AF',
      '@media (max-width:600px)': {
        fontSize: '1.5rem'
      }
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.5rem',
      color: '#1E293B',
      '@media (max-width:600px)': {
        fontSize: '1.25rem'
      }
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      color: '#1E293B',
      '@media (max-width:600px)': {
        fontSize: '1.1rem'
      }
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.1rem',
      color: '#1E293B',
      '@media (max-width:600px)': {
        fontSize: '1rem'
      }
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      color: '#1E293B',
      '@media (max-width:600px)': {
        fontSize: '0.9rem'
      }
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
      letterSpacing: '0.3px',
      '@media (max-width:600px)': {
        fontSize: '0.9rem'
      }
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#64748B',
      '@media (max-width:600px)': {
        fontSize: '0.9rem'
      }
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: '#64748B',
      '@media (max-width:600px)': {
        fontSize: '0.8rem'
      }
    },
    body1: {
      '@media (max-width:600px)': {
        fontSize: '0.9rem'
      }
    },
    body2: {
      '@media (max-width:600px)': {
        fontSize: '0.85rem'
      }
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 2px 4px rgba(0,0,0,0.2)',
    '0 4px 8px rgba(0,0,0,0.2)',
    '0 6px 12px rgba(0,0,0,0.25)',
    '0 8px 16px rgba(0,0,0,0.3)',
    '0 10px 20px rgba(0,0,0,0.3)',
    '0 12px 24px rgba(0,0,0,0.35)',
    '0 14px 28px rgba(0,0,0,0.35)',
    '0 16px 32px rgba(0,0,0,0.4)',
    '0 18px 36px rgba(0,0,0,0.4)',
    '0 20px 40px rgba(0,0,0,0.45)',
    '0 22px 44px rgba(0,0,0,0.45)',
    '0 24px 48px rgba(0,0,0,0.5)',
    '0 26px 52px rgba(0,0,0,0.5)',
    '0 28px 56px rgba(0,0,0,0.55)',
    '0 30px 60px rgba(0,0,0,0.55)',
    '0 32px 64px rgba(0,0,0,0.6)',
    '0 34px 68px rgba(0,0,0,0.6)',
    '0 36px 72px rgba(0,0,0,0.65)',
    '0 38px 76px rgba(0,0,0,0.65)',
    '0 40px 80px rgba(0,0,0,0.7)',
    '0 42px 84px rgba(0,0,0,0.7)',
    '0 44px 88px rgba(0,0,0,0.75)',
    '0 46px 92px rgba(0,0,0,0.75)',
    '0 48px 96px rgba(0,0,0,0.8)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '12px 32px',
          fontSize: '1rem',
          boxShadow: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '@media (max-width:600px)': {
            padding: '10px 24px',
            fontSize: '0.9rem'
          },
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(30, 64, 175, 0.3)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
          color: '#FFFFFF',
          fontWeight: 600,
          '&:hover': {
            background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
          },
        },
        sizeSmall: {
          '@media (max-width:600px)': {
            padding: '8px 16px',
            fontSize: '0.8rem'
          }
        },
        sizeLarge: {
          '@media (max-width:600px)': {
            padding: '12px 28px',
            fontSize: '0.95rem'
          }
        }
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#FFFFFF',
            transition: 'all 0.3s ease',
            '@media (max-width:600px)': {
              fontSize: '16px' // Prevents zoom on iOS
            },
            '&:hover': {
              backgroundColor: '#F8FAFC',
            },
            '&.Mui-focused': {
              backgroundColor: '#FFFFFF',
              boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          '@media (max-width:600px)': {
            borderRadius: 12,
            margin: '0 8px'
          }
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (max-width:600px)': {
            paddingLeft: 16,
            paddingRight: 16
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          '@media (max-width:600px)': {
            borderRadius: 8
          }
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#1E293B',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          borderBottom: '1px solid #E2E8F0',
        },
      },
    },
  },
});

export default sportTheme;
