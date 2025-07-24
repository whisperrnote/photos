import React from 'react';
import MainAppBar from '../components/AppBar';
import Footer from '../components/Footer';
import Container from '@mui/material/Container';
import '../app/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MainAppBar />
        <Container maxWidth="md" sx={{ py: 6 }}>
          {children}
        </Container>
        <Footer />
      </body>
    </html>
  );
}
