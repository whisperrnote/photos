import React from 'react';
import ThemeClientProvider from '../components/ThemeClientProvider';
import MainAppBar from '../components/AppBar';
import Footer from '../components/Footer';
import Container from '@mui/material/Container';

import '../app/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
<ThemeClientProvider>
      <MainAppBar />
      <Container maxWidth="lg" sx={{ py: 6, minHeight: 'calc(100vh - 200px)' }}>
        {children}
      </Container>
      <Footer />
    </ThemeClientProvider>      </body>
    </html>
  );
}
