'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  PhotoLibrary,
  Home,
  CloudUpload,
  Collections,
  Person,
  Menu as MenuIcon,
  Close,
} from '@mui/icons-material';
import Link from 'next/link';

export default function MainAppBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigationItems = [
    { label: 'Home', href: '/', icon: <Home /> },
    { label: 'Gallery', href: '/gallery', icon: <PhotoLibrary /> },
    { label: 'Upload', href: '/upload', icon: <CloudUpload /> },
    { label: 'Albums', href: '/albums', icon: <Collections /> },
  ];

  const profileMenuItems = [
    { label: 'Profile', href: '/profile' },
    { label: 'Settings', href: '/profile' },
    { label: 'Sign Out', href: '/signin' },
  ];

  const MobileDrawer = () => (
    <Drawer
      anchor="left"
      open={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
    >
      <Box sx={{ width: 250, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" color="primary">
            Photos
          </Typography>
          <IconButton onClick={() => setMobileMenuOpen(false)}>
            <Close />
          </IconButton>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        <List>
          {navigationItems.map((item) => (
            <ListItem
              key={item.label}
              component={Link}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              sx={{ 
                borderRadius: 1, 
                mb: 1,
                '&:hover': { backgroundColor: 'action.hover' }
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
        
        <Divider sx={{ my: 2 }} />
        
        <List>
          {profileMenuItems.map((item) => (
            <ListItem
              key={item.label}
              component={Link}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              sx={{ 
                borderRadius: 1, 
                mb: 1,
                '&:hover': { backgroundColor: 'action.hover' }
              }}
            >
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <>
      <AppBar position="static" sx={{ boxShadow: 1 }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setMobileMenuOpen(true)}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
            <PhotoLibrary sx={{ fontSize: 32, mr: 1 }} />
            <Typography variant="h5" component={Link} href="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
              Photos
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, flexGrow: 1 }}>
            {navigationItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                href={item.href}
                color="inherit"
                startIcon={item.icon}
                sx={{ 
                  textTransform: 'none',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Profile Menu */}
          <IconButton
            onClick={handleProfileMenuOpen}
            color="inherit"
            sx={{ p: 0 }}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
              JD
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {profileMenuItems.map((item) => (
              <MenuItem
                key={item.label}
                component={Link}
                href={item.href}
                onClick={handleMenuClose}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <MobileDrawer />
    </>
  );
}
