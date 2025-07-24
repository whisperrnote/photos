'use client';

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Fab,
  Toolbar,
  TextField,
  InputAdornment,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Search,
  Add,
  MoreVert,
  Favorite,
  FavoriteBorder,
  Download,
  Share,
  Delete,
  PhotoLibrary,
  GridView,
  ViewList,
} from '@mui/icons-material';

// Mock photo data
const mockPhotos = [
  {
    id: 1,
    src: '/api/placeholder/400/300',
    title: 'Mountain Landscape',
    date: '2024-01-15',
    size: '2.4 MB',
    liked: false,
    tags: ['nature', 'landscape', 'mountains'],
  },
  {
    id: 2,
    src: '/api/placeholder/400/300',
    title: 'City Skyline',
    date: '2024-01-20',
    size: '3.1 MB',
    liked: true,
    tags: ['city', 'architecture', 'sunset'],
  },
  {
    id: 3,
    src: '/api/placeholder/400/300',
    title: 'Ocean View',
    date: '2024-02-05',
    size: '1.8 MB',
    liked: false,
    tags: ['ocean', 'beach', 'nature'],
  },
  {
    id: 4,
    src: '/api/placeholder/400/300',
    title: 'Forest Path',
    date: '2024-02-10',
    size: '2.7 MB',
    liked: true,
    tags: ['forest', 'nature', 'hiking'],
  },
  {
    id: 5,
    src: '/api/placeholder/400/300',
    title: 'Desert Dunes',
    date: '2024-02-18',
    size: '2.2 MB',
    liked: false,
    tags: ['desert', 'landscape', 'sand'],
  },
  {
    id: 6,
    src: '/api/placeholder/400/300',
    title: 'Autumn Leaves',
    date: '2024-03-01',
    size: '3.5 MB',
    liked: true,
    tags: ['autumn', 'leaves', 'nature'],
  },
];

function PhotoMenu({ anchorEl, open, onClose, photo, onLike }) {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem onClick={onLike}>
        <ListItemIcon>
          {photo.liked ? <Favorite /> : <FavoriteBorder />}
        </ListItemIcon>
        <ListItemText>{photo.liked ? 'Unlike' : 'Like'}</ListItemText>
      </MenuItem>
      <MenuItem onClick={onClose}>
        <ListItemIcon>
          <Download />
        </ListItemIcon>
        <ListItemText>Download</ListItemText>
      </MenuItem>
      <MenuItem onClick={onClose}>
        <ListItemIcon>
          <Share />
        </ListItemIcon>
        <ListItemText>Share</ListItemText>
      </MenuItem>
      <MenuItem onClick={onClose}>
        <ListItemIcon>
          <Delete />
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>
    </Menu>
  );
}

export default function GalleryPageClient() {
  const [photos, setPhotos] = useState(mockPhotos);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const allTags = Array.from(new Set(photos.flatMap(photo => photo.tags)));

  const filteredPhotos = photos.filter(photo => {
    const matchesSearch = photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTag = !selectedTag || photo.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const handleMenuOpen = (event, photo) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedPhoto(photo);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedPhoto(null);
  };

  const handleLike = () => {
    if (selectedPhoto) {
      setPhotos(prev =>
        prev.map(photo =>
          photo.id === selectedPhoto.id
            ? { ...photo, liked: !photo.liked }
            : photo
        )
      );
    }
    handleMenuClose();
  };

  const handleTagFilter = (tag) => {
    setSelectedTag(selectedTag === tag ? '' : tag);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Photo Library
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Organize and manage your photo collection
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search photos..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
          sx={{ mb: 2 }}
        />

        {/* Tag Filter Chips */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {allTags.map(tag => (
            <Chip
              key={tag}
              label={tag}
              onClick={() => handleTagFilter(tag)}
              color={selectedTag === tag ? 'primary' : 'default'}
              variant={selectedTag === tag ? 'filled' : 'outlined'}
            />
          ))}
        </Box>

        {/* View Mode Toggle */}
        <Toolbar sx={{ pl: 0, minHeight: 'auto !important' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              onClick={() => setViewMode('grid')}
              color={viewMode === 'grid' ? 'primary' : 'default'}
            >
              <GridView />
            </IconButton>
            <IconButton
              onClick={() => setViewMode('list')}
              color={viewMode === 'list' ? 'primary' : 'default'}
            >
              <ViewList />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {filteredPhotos.length} photos
          </Typography>
        </Toolbar>
      </Box>

      {/* Photo Grid */}
      <Grid container spacing={2}>
        {filteredPhotos.map(photo => (
          <Grid key={photo.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card
              sx={{
                position: 'relative',
                '&:hover .photo-overlay': {
                  opacity: 1,
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={`https://picsum.photos/400/300?random=${photo.id}`}
                alt={photo.title}
                sx={{ objectFit: 'cover' }}
              />
              {/* Overlay */}
              <Box
                className="photo-overlay"
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  background: 'rgba(0, 0, 0, 0.4)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                }}
              >
                <Box sx={{ p: 2, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 600 }}>
                      {photo.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      {photo.date} • {photo.size}
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={e => handleMenuOpen(e, photo)}
                    sx={{ color: 'white' }}
                  >
                    <MoreVert />
                  </IconButton>
                </Box>
              </Box>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="subtitle2" noWrap>
                  {photo.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {photo.date} • {photo.size}
                </Typography>
                <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {photo.tags.slice(0, 2).map(tag => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                  ))}
                  {photo.tags.length > 2 && (
                    <Typography variant="caption" color="text.secondary">
                      +{photo.tags.length - 2}
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {filteredPhotos.length === 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 8,
            textAlign: 'center',
          }}
        >
          <PhotoLibrary sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No photos found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filters
          </Typography>
        </Box>
      )}

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
        }}
        href="/upload"
      >
        <Add />
      </Fab>

      {/* Photo Menu */}
      <PhotoMenu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        photo={selectedPhoto || mockPhotos[0]}
        onLike={handleLike}
      />
    </Box>
  );
}
