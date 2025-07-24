import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import PublicIcon from '@mui/icons-material/Public';
import FeatureCard from '../components/FeatureCard';

export default function HomePage() {
  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        The Open Source, Scalable, Decentralized Alternative to Google Photos
      </Typography>

      <Grid container spacing={4} justifyContent="center" sx={{ my: 4 }}>
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

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 4 }}>
        <Button variant="contained" size="large" href="#view">View Your Photos</Button>
        <Button variant="contained" size="large" href="#upload">Upload Photos</Button>
        <Button variant="outlined" size="large" href="https://github.com/your-repo" target="_blank" rel="noopener">Contribute</Button>
        <Button variant="outlined" size="large" href="#learn">Learn More</Button>
      </Box>
    </>
  );
}
