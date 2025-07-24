import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import PublicIcon from '@mui/icons-material/Public';

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <AppBar position="static" color="default" elevation={0} sx={{ mb: 4 }}>
        <Toolbar>
          <PublicIcon sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Photos
          </Typography>
        </Toolbar>
      </AppBar>

      <Typography variant="h4" align="center" gutterBottom>
        The Open Source, Scalable, Decentralized Alternative to Google Photos
      </Typography>

      <Grid container spacing={4} justifyContent="center" sx={{ my: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card variant="outlined">
            <CardContent sx={{ textAlign: 'center' }}>
              <CodeIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" gutterBottom>Open Source</Typography>
              <Typography variant="body2">Transparent, community-driven development. Fork, contribute, and make it yours.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card variant="outlined">
            <CardContent sx={{ textAlign: 'center' }}>
              <StorageIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" gutterBottom>Scalable</Typography>
              <Typography variant="body2">Handles your photo library, big or small. Built for performance and reliability.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card variant="outlined">
            <CardContent sx={{ textAlign: 'center' }}>
              <PublicIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" gutterBottom>Decentralized</Typography>
              <Typography variant="body2">Your photos, your control—no central authority. Host and share on your terms.</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 4 }}>
        <Button variant="contained" size="large" href="#view">View Your Photos</Button>
        <Button variant="contained" size="large" href="#upload">Upload Photos</Button>
        <Button variant="outlined" size="large" href="https://github.com/your-repo" target="_blank" rel="noopener">Contribute</Button>
        <Button variant="outlined" size="large" href="#learn">Learn More</Button>
      </Box>

      <Box component="footer" sx={{ textAlign: 'center', mt: 6, color: 'text.secondary' }}>
        Made with <span aria-label="love">❤️</span> by the open source community
      </Box>
    </Container>
  );
}
