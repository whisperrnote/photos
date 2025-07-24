import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import PublicIcon from '@mui/icons-material/Public';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FeatureCard from '../components/FeatureCard';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Your Photos, Your Way
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
          The open source, scalable, decentralized alternative for photo management
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 4 }}>
          <Button
            component={Link}
            href="/gallery"
            variant="contained"
            size="large"
            startIcon={<PhotoLibraryIcon />}
            sx={{ minWidth: 160 }}
          >
            View Gallery
          </Button>
          <Button
            component={Link}
            href="/upload"
            variant="contained"
            size="large"
            startIcon={<CloudUploadIcon />}
            sx={{ minWidth: 160 }}
          >
            Upload Photos
          </Button>
          <Button
            component={Link}
            href="/signin"
            variant="outlined"
            size="large"
            sx={{ minWidth: 160 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Grid container spacing={4} justifyContent="center" sx={{ my: 6 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <FeatureCard
            icon={<CodeIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />}
            title="Open Source"
            description="Transparent, community-driven development. Fork, contribute, and make it yours."
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <FeatureCard
            icon={<StorageIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />}
            title="Scalable"
            description="Handles your photo library, big or small. Built for performance and reliability."
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <FeatureCard
            icon={<PublicIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />}
            title="Decentralized"
            description="Your photos, your control—no central authority. Host and share on your terms."
          />
        </Grid>
      </Grid>

      {/* Quick Start Section */}
      <Paper sx={{ p: 4, mt: 6, background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.05) 0%, rgba(85, 107, 47, 0.05) 100%)' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Get Started in Minutes
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Start organizing and managing your photos with our intuitive interface
        </Typography>
        
        <Grid container spacing={3} justifyContent="center">
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom color="primary">
                1. Create Account
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign up for your free account and get 15GB of storage
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom color="primary">
                2. Upload Photos
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Drag and drop your photos or select them from your device
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom color="primary">
                3. Organize
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Create albums, add tags, and organize your memories
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom color="primary">
                4. Share & Enjoy
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Share your albums and relive your favorite moments
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            component={Link}
            href="/signup"
            variant="contained"
            size="large"
            sx={{ minWidth: 200 }}
          >
            Start Your Journey
          </Button>
        </Box>
      </Paper>
    </>
  );
}
