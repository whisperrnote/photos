import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MainAppBar from '../components/AppBar';
import Footer from '../components/Footer';
import Container from '@mui/material/Container';
import theme from '../theme/theme';
import '../app/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainAppBar />
          <Container maxWidth="lg" sx={{ py: 6, minHeight: 'calc(100vh - 200px)' }}>
            {children}
          </Container>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
