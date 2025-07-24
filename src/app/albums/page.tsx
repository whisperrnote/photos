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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  Add,
  MoreVert,
  Edit,
  Delete,
  Share,
  Folder,
  Close,
} from '@mui/icons-material';

interface Album {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  photoCount: number;
  createdDate: string;
  tags: string[];
}

const mockAlbums: Album[] = [
  {
    id: 1,
    title: 'Nature Photography',
    description: 'Beautiful landscapes and wildlife shots from my hiking trips',
    coverImage: 'https://picsum.photos/400/300?random=1',
    photoCount: 24,
    createdDate: '2024-01-15',
    tags: ['nature', 'landscape', 'hiking'],
  },
  {
    id: 2,
    title: 'City Adventures',
    description: 'Urban exploration and architecture photography',
    coverImage: 'https://picsum.photos/400/300?random=2',
    photoCount: 18,
    createdDate: '2024-02-20',
    tags: ['city', 'architecture', 'urban'],
  },
  {
    id: 3,
    title: 'Family Moments',
    description: 'Precious memories with loved ones',
    coverImage: 'https://picsum.photos/400/300?random=3',
    photoCount: 42,
    createdDate: '2024-01-05',
    tags: ['family', 'memories', 'people'],
  },
  {
    id: 4,
    title: 'Travel Diaries',
    description: 'Adventures from around the world',
    coverImage: 'https://picsum.photos/400/300?random=4',
    photoCount: 67,
    createdDate: '2023-12-10',
    tags: ['travel', 'adventure', 'world'],
  },
  {
    id: 5,
    title: 'Food & Culinary',
    description: 'Delicious dishes and culinary experiences',
    coverImage: 'https://picsum.photos/400/300?random=5',
    photoCount: 15,
    createdDate: '2024-03-01',
    tags: ['food', 'culinary', 'restaurant'],
  },
  {
    id: 6,
    title: 'Events & Celebrations',
    description: 'Special occasions and memorable events',
    coverImage: 'https://picsum.photos/400/300?random=6',
    photoCount: 33,
    createdDate: '2024-02-14',
    tags: ['events', 'celebration', 'special'],
  },
];

export default function AlbumsPage() {
  const [albums, setAlbums] = useState(mockAlbums);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
  });

  const handleCreateAlbum = () => {
    if (formData.title.trim()) {
      const newAlbum: Album = {
        id: Math.max(...albums.map(a => a.id)) + 1,
        title: formData.title,
        description: formData.description,
        coverImage: 'https://picsum.photos/400/300?random=' + Math.random(),
        photoCount: 0,
        createdDate: new Date().toISOString().split('T')[0],
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      };
      
      setAlbums(prev => [newAlbum, ...prev]);
      setCreateDialogOpen(false);
      setFormData({ title: '', description: '', tags: '' });
    }
  };

  const handleEditAlbum = () => {
    if (editingAlbum && formData.title.trim()) {
      setAlbums(prev =>
        prev.map(album =>
          album.id === editingAlbum.id
            ? {
                ...album,
                title: formData.title,
                description: formData.description,
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
              }
            : album
        )
      );
      setEditingAlbum(null);
      setFormData({ title: '', description: '', tags: '' });
    }
  };

  const handleDeleteAlbum = () => {
    if (selectedAlbum) {
      setAlbums(prev => prev.filter(album => album.id !== selectedAlbum.id));
      handleMenuClose();
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, album: Album) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedAlbum(album);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedAlbum(null);
  };

  const openEditDialog = () => {
    if (selectedAlbum) {
      setEditingAlbum(selectedAlbum);
      setFormData({
        title: selectedAlbum.title,
        description: selectedAlbum.description,
        tags: selectedAlbum.tags.join(', '),
      });
      handleMenuClose();
    }
  };

  const handleDialogClose = () => {
    setCreateDialogOpen(false);
    setEditingAlbum(null);
    setFormData({ title: '', description: '', tags: '' });
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Albums
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Organize your photos into meaningful collections
        </Typography>
      </Box>

      {/* Albums Grid */}
      <Grid container spacing={3}>
        {albums.map((album) => (
          <Grid key={album.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card
              sx={{
                position: 'relative',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: (theme) => theme.shadows[8],
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={album.coverImage}
                alt={album.title}
                sx={{ objectFit: 'cover' }}
              />
              
              {/* Album Info Overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  p: 2,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Chip 
                    label={`${album.photoCount} photos`}
                    size="small"
                    sx={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      backdropFilter: 'blur(4px)',
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuOpen(e, album);
                    }}
                    sx={{ color: 'white' }}
                  >
                    <MoreVert />
                  </IconButton>
                </Box>

                <Box>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 0.5 }}>
                    {album.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Created {album.createdDate}
                  </Typography>
                </Box>
              </Box>
            </Card>

            <CardContent sx={{ p: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {album.description}
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {album.tags.slice(0, 3).map((tag) => (
                  <Chip key={tag} label={tag} size="small" variant="outlined" />
                ))}
                {album.tags.length > 3 && (
                  <Typography variant="caption" color="text.secondary">
                    +{album.tags.length - 3}
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {albums.length === 0 && (
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
          <Folder sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No albums yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create your first album to organize your photos
          </Typography>
        </Box>
      )}

      {/* Floating Action Button */}
      <Fab
        color="primary"
        onClick={() => setCreateDialogOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
        }}
      >
        <Add />
      </Fab>

      {/* Album Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={openEditDialog}>
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          <ListItemText>Edit Album</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Share />
          </ListItemIcon>
          <ListItemText>Share Album</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteAlbum}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText>Delete Album</ListItemText>
        </MenuItem>
      </Menu>

      {/* Create/Edit Album Dialog */}
      <Dialog
        open={createDialogOpen || Boolean(editingAlbum)}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {editingAlbum ? 'Edit Album' : 'Create New Album'}
            <IconButton onClick={handleDialogClose}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Album Title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            margin="normal"
            multiline
            rows={3}
          />
          
          <TextField
            fullWidth
            label="Tags (comma-separated)"
            value={formData.tags}
            onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
            margin="normal"
            placeholder="nature, travel, family"
            helperText="Add tags to make your album easier to find"
          />
        </DialogContent>
        
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button
            onClick={editingAlbum ? handleEditAlbum : handleCreateAlbum}
            variant="contained"
            disabled={!formData.title.trim()}
          >
            {editingAlbum ? 'Save Changes' : 'Create Album'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}