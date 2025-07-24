import Box from '@mui/material/Box';

export default function Footer() {
  return (
    <Box component="footer" sx={{ textAlign: 'center', mt: 6, color: 'text.secondary' }}>
      Made with <span aria-label="love">❤️</span> by the open source community
    </Box>
  );
}
