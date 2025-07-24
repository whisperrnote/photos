import { createTheme } from '@mui/material/styles';

// Custom color palette: brick wall brown/muted ash/green shades
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#8B4513', // Saddle brown (brick-like)
      light: '#A0522D', // Sienna
      dark: '#654321', // Dark brown
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#556B2F', // Dark olive green
      light: '#6B8E23', // Olive drab
      dark: '#2F4F2F', // Dark sea green
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F5DC', // Beige (muted ash)
      paper: '#FAEBD7', // Antique white
    },
    text: {
      primary: '#2F2F2F', // Dark gray
      secondary: '#5D4037', // Brown gray
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E', // Muted ash
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    success: {
      main: '#4CAF50', // Green
      light: '#81C784',
      dark: '#388E3C',
    },
    error: {
      main: '#D32F2F',
      light: '#EF5350',
      dark: '#C62828',
    },
    warning: {
      main: '#FF9800',
      light: '#FFB74D',
      dark: '#F57C00',
    },
    info: {
      main: '#2196F3',
      light: '#64B5F6',
      dark: '#1976D2',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      color: '#654321',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
      color: '#654321',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.4,
      color: '#8B4513',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      color: '#8B4513',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.5,
      color: '#8B4513',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#8B4513',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#2F2F2F',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#5D4037',
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          fontWeight: 600,
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 24,
          paddingRight: 24,
        },
        contained: {
          boxShadow: '0 2px 8px rgba(139, 69, 19, 0.2)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(139, 69, 19, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#8B4513',
          boxShadow: '0 2px 8px rgba(139, 69, 19, 0.2)',
        },
      },
    },
  },
});

export default theme;