import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PublicIcon from '@mui/icons-material/Public';

export default function MainAppBar() {
  return (
    <AppBar position="static" color="default" elevation={0} sx={{ mb: 4 }}>
      <Toolbar>
        <PublicIcon sx={{ fontSize: 40, mr: 2 }} />
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Photos
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
