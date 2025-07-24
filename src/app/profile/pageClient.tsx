'use client';

import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  Person,
  Lock,
  Notifications,
  Storage,
  Download,
  Delete,
  CloudUpload,
  Edit,
  Save,
  Cancel,
  PhotoCamera,
  Logout,
  Help,
} from '@mui/icons-material';

const mockUserStats = {
  totalPhotos: 1247,
  totalAlbums: 23,
  storageUsed: 8.4, // GB
  storageLimit: 15, // GB
};

export default function ProfilePageClient() {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    bio: 'Photography enthusiast who loves capturing moments and memories.',
  });
  const [settings, setSettings] = useState({
    emailNotifications: true,
    autoBackup: true,
    publicProfile: false,
    darkMode: false,
    compressUploads: true,
  });
  const [stats] = useState(mockUserStats);

  const handleSaveProfile = () => {
    // TODO: Implement profile update logic
    setIsEditing(false);
  };

  const handleSettingChange = (setting) => (event) => {
    setSettings(prev => ({
      ...prev,
      [setting]: event.target.checked,
    }));
  };

  const handleInputChange = (field) => (event) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const storagePercentage = (stats.storageUsed / stats.storageLimit) * 100;

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Profile & Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your account and preferences
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {/* Profile Information */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" component="h2">
                Profile Information
              </Typography>
              <Button
                startIcon={isEditing ? <Save /> : <Edit />}
                onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                variant={isEditing ? 'contained' : 'outlined'}
              >
                {isEditing ? 'Save' : 'Edit'}
              </Button>
              {isEditing && (
                <Button
                  startIcon={<Cancel />}
                  onClick={() => setIsEditing(false)}
                  sx={{ ml: 1 }}
                >
                  Cancel
                </Button>
              )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar sx={{ width: 100, height: 100, mr: 3, fontSize: '2rem' }}>
                {userInfo.firstName[0]}{userInfo.lastName[0]}
              </Avatar>
              <Box>
                <Typography variant="h6">
                  {userInfo.firstName} {userInfo.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {userInfo.email}
                </Typography>
                <Button size="small" startIcon={<PhotoCamera />}>
                  Change Photo
                </Button>
              </Box>
            </Box>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={userInfo.firstName}
                  onChange={handleInputChange('firstName')}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={userInfo.lastName}
                  onChange={handleInputChange('lastName')}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Email Address"
                  value={userInfo.email}
                  onChange={handleInputChange('email')}
                  disabled={!isEditing}
                  type="email"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Bio"
                  value={userInfo.bio}
                  onChange={handleInputChange('bio')}
                  disabled={!isEditing}
                  multiline
                  rows={3}
                  placeholder="Tell us about yourself..."
                />
              </Grid>
            </Grid>
          </Paper>
          {/* Settings */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Settings
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Notifications />
                </ListItemIcon>
                <ListItemText
                  primary="Email Notifications"
                  secondary="Receive updates about your photos and albums"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.emailNotifications}
                      onChange={handleSettingChange('emailNotifications')}
                    />
                  }
                  label=""
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CloudUpload />
                </ListItemIcon>
                <ListItemText
                  primary="Auto Backup"
                  secondary="Automatically backup new photos"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.autoBackup}
                      onChange={handleSettingChange('autoBackup')}
                    />
                  }
                  label=""
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText
                  primary="Public Profile"
                  secondary="Allow others to view your profile"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.publicProfile}
                      onChange={handleSettingChange('publicProfile')}
                    />
                  }
                  label=""
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Storage />
                </ListItemIcon>
                <ListItemText
                  primary="Compress Uploads"
                  secondary="Automatically compress photos to save space"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.compressUploads}
                      onChange={handleSettingChange('compressUploads')}
                    />
                  }
                  label=""
                />
              </ListItem>
            </List>
            <Divider sx={{ my: 2 }} />
            <List>
              <ListItem component="button">
                <ListItemIcon>
                  <Lock />
                </ListItemIcon>
                <ListItemText
                  primary="Change Password"
                  secondary="Update your account password"
                />
              </ListItem>
              <ListItem component="button">
                <ListItemIcon>
                  <Download />
                </ListItemIcon>
                <ListItemText
                  primary="Export Data"
                  secondary="Download all your photos and data"
                />
              </ListItem>
              <ListItem component="button">
                <ListItemIcon>
                  <Help />
                </ListItemIcon>
                <ListItemText
                  primary="Help & Support"
                  secondary="Get help with using the app"
                />
              </ListItem>
              <ListItem component="button" onClick={() => setShowDeleteDialog(true)}>
                <ListItemIcon>
                  <Delete color="error" />
                </ListItemIcon>
                <ListItemText
                  primary="Delete Account"
                  secondary="Permanently delete your account and all data"
                  slotProps={{ primary: { color: 'error' } }}
                />
              </ListItem>
              <ListItem component="button">
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText
                  primary="Sign Out"
                  secondary="Sign out of your account"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        {/* Statistics Sidebar */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Account Statistics
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Photos</Typography>
                <Typography variant="body2" fontWeight={600}>
                  {stats.totalPhotos.toLocaleString()}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Albums</Typography>
                <Typography variant="body2" fontWeight={600}>
                  {stats.totalAlbums}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Storage Usage
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Used</Typography>
                <Typography variant="body2" fontWeight={600}>
                  {stats.storageUsed} GB / {stats.storageLimit} GB
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={storagePercentage}
                sx={{ height: 8, borderRadius: 4 }}
                color={storagePercentage > 80 ? 'error' : storagePercentage > 60 ? 'warning' : 'primary'}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {(stats.storageLimit - stats.storageUsed).toFixed(1)} GB remaining
              </Typography>
            </Box>
            {storagePercentage > 80 && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                You&apos;re running low on storage space. Consider upgrading your plan.
              </Alert>
            )}
            <Button
              fullWidth
              variant="outlined"
              size="small"
              sx={{ mb: 1 }}
            >
              Upgrade Storage
            </Button>
          </Paper>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Account Type
              </Typography>
              <Chip label="Free Plan" color="primary" />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                15 GB storage included
              </Typography>
              <Button size="small" sx={{ mt: 1 }}>
                View Plans
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* Delete Account Dialog */}
      <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Alert severity="error" sx={{ mb: 2 }}>
            This action cannot be undone. All your photos, albums, and data will be permanently deleted.
          </Alert>
          <Typography variant="body1">
            Are you sure you want to delete your account? Type &quot;DELETE&quot; below to confirm.
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            placeholder="Type DELETE to confirm"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>
            Cancel
          </Button>
          <Button color="error" variant="contained">
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
