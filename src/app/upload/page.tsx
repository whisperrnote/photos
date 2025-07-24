'use client';

import React, { useState, useCallback } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  LinearProgress,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Chip,
  TextField,
  Grid,
  Alert,
  Fab,
} from '@mui/material';
import {
  CloudUpload,
  Close,
  PhotoCamera,
  Folder,
  CheckCircle,
  Error as ErrorIcon,
} from '@mui/icons-material';

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

export default function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [albumName, setAlbumName] = useState('');

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleFiles = useCallback((files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    imageFiles.forEach(file => {
      const id = Math.random().toString(36).slice(2, 11);
      const preview = URL.createObjectURL(file);
      
      const newFile: UploadedFile = {
        id,
        file,
        preview,
        progress: 0,
        status: 'uploading',
      };

      setUploadedFiles(prev => [...prev, newFile]);

      // Simulate upload progress
      simulateUpload(id);
    });
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, [handleFiles]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setUploadedFiles(prev => 
        prev.map(file => {
          if (file.id === fileId) {
            const newProgress = file.progress + Math.random() * 20;
            
            if (newProgress >= 100) {
              clearInterval(interval);
              return {
                ...file,
                progress: 100,
                status: Math.random() > 0.1 ? 'success' : 'error',
                error: Math.random() > 0.1 ? undefined : 'Upload failed. Please try again.',
              };
            }
            
            return { ...file, progress: newProgress };
          }
          return file;
        })
      );
    }, 200);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== fileId);
    });
  };

  const retryUpload = (fileId: string) => {
    setUploadedFiles(prev =>
      prev.map(file =>
        file.id === fileId
          ? { ...file, progress: 0, status: 'uploading' as const, error: undefined }
          : file
      )
    );
    simulateUpload(fileId);
  };

  const getStatusColor = (status: UploadedFile['status']) => {
    switch (status) {
      case 'success': return 'success';
      case 'error': return 'error';
      default: return 'primary';
    }
  };

  const getStatusIcon = (status: UploadedFile['status']) => {
    switch (status) {
      case 'success': return <CheckCircle />;
      case 'error': return <ErrorIcon />;
      default: return null;
    }
  };

  const successfulUploads = uploadedFiles.filter(f => f.status === 'success').length;
  const failedUploads = uploadedFiles.filter(f => f.status === 'error').length;

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Upload Photos
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Add new photos to your library
        </Typography>
      </Box>

      {/* Album Name Input */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Album Name (Optional)"
          placeholder="Enter album name to organize your photos"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
          InputProps={{
            startAdornment: <Folder sx={{ mr: 1, color: 'action.active' }} />,
          }}
        />
      </Box>

      {/* Upload Area */}
      <Paper
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        sx={{
          p: 4,
          mb: 4,
          border: '2px dashed',
          borderColor: isDragging ? 'primary.main' : 'grey.300',
          backgroundColor: isDragging ? 'action.hover' : 'background.paper',
          transition: 'all 0.3s ease',
          textAlign: 'center',
          cursor: 'pointer',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'action.hover',
          },
        }}
      >
        <CloudUpload sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
        
        <Typography variant="h5" gutterBottom>
          Drag & drop your photos here
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          or click to browse and select files
        </Typography>

        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="file-upload"
          multiple
          type="file"
          onChange={handleFileSelect}
        />
        
        <label htmlFor="file-upload">
          <Button
            component="span"
            variant="contained"
            startIcon={<PhotoCamera />}
            size="large"
          >
            Choose Photos
          </Button>
        </label>

        <Typography variant="caption" display="block" sx={{ mt: 2, color: 'text.secondary' }}>
          Supported formats: JPG, PNG, GIF, WEBP (Max 10MB per file)
        </Typography>
      </Paper>

      {/* Upload Progress Summary */}
      {uploadedFiles.length > 0 && (
        <Alert 
          severity={failedUploads > 0 ? 'warning' : 'info'}
          sx={{ mb: 3 }}
        >
          <Typography variant="body2">
            {successfulUploads} uploaded successfully
            {failedUploads > 0 && `, ${failedUploads} failed`}
            {uploadedFiles.filter(f => f.status === 'uploading').length > 0 && 
              `, ${uploadedFiles.filter(f => f.status === 'uploading').length} in progress`
            }
          </Typography>
        </Alert>
      )}

      {/* Uploaded Files Grid */}
      {uploadedFiles.length > 0 && (
        <Grid container spacing={2}>
          {uploadedFiles.map((uploadedFile) => (
            <Grid key={uploadedFile.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card>
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={uploadedFile.preview}
                    alt={uploadedFile.file.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  
                  <IconButton
                    onClick={() => removeFile(uploadedFile.id)}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      },
                    }}
                    size="small"
                  >
                    <Close />
                  </IconButton>

                  {uploadedFile.status !== 'uploading' && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        color: getStatusColor(uploadedFile.status),
                      }}
                    >
                      {getStatusIcon(uploadedFile.status)}
                    </Box>
                  )}
                </Box>

                <CardContent sx={{ p: 2 }}>
                  <Typography variant="subtitle2" noWrap gutterBottom>
                    {uploadedFile.file.name}
                  </Typography>
                  
                  <Typography variant="caption" color="text.secondary" display="block">
                    {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                  </Typography>

                  {uploadedFile.status === 'uploading' && (
                    <Box sx={{ mt: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={uploadedFile.progress}
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {Math.round(uploadedFile.progress)}%
                      </Typography>
                    </Box>
                  )}

                  {uploadedFile.status === 'success' && (
                    <Chip 
                      label="Uploaded" 
                      color="success" 
                      size="small" 
                      sx={{ mt: 1 }}
                    />
                  )}

                  {uploadedFile.status === 'error' && (
                    <Box sx={{ mt: 1 }}>
                      <Chip 
                        label="Failed" 
                        color="error" 
                        size="small" 
                        sx={{ mb: 1 }}
                      />
                      <Button
                        size="small"
                        onClick={() => retryUpload(uploadedFile.id)}
                        variant="outlined"
                        fullWidth
                      >
                        Retry
                      </Button>
                      {uploadedFile.error && (
                        <Typography variant="caption" color="error" display="block" sx={{ mt: 0.5 }}>
                          {uploadedFile.error}
                        </Typography>
                      )}
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Floating Action Button to Gallery */}
      {successfulUploads > 0 && (
        <Fab
          variant="extended"
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
          }}
          href="/gallery"
        >
          <PhotoCamera sx={{ mr: 1 }} />
          View Gallery
        </Fab>
      )}
    </Box>
  );
}