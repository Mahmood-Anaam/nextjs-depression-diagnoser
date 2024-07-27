'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, TextField, Button, Avatar, CircularProgress } from '@mui/material';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import SnackBar from "@/components/layout/shared/snackbar/SnackBar";

const ProfileClient = ({ user }) => {
  const [formData, setFormData] = useState({
    email: user.email,
    username: user.username,
    avatar: user.profile?.avatar || '',
    password: '',
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const router = useRouter();

  const handleEdit = () => {
    setEditing(true);
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/users/profile/${user.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          window.location.href = '/login';
        } else {
          setSnackbar({ open: true, message: 'Failed to delete account', severity: 'error' });
        }
      } catch (error) {
        setSnackbar({ open: true, message: 'Failed to delete account', severity: 'error' });
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'avatar') {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/users/profile/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setEditing(false);
        setSnackbar({ open: true, message: 'Profile updated successfully', severity: 'success' });
      } else {
        setSnackbar({ open: true, message: 'Failed to update profile', severity: 'error' });
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to update profile', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar src={formData.avatar} sx={{ width: 80, height: 80, mr: 2 }} />
        <Button variant="outlined" component="label">
          Change Avatar
          <input type="file" hidden onChange={handleChange} name="avatar" />
        </Button>
      </Box>
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        disabled={!editing}
      />
      <TextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        fullWidth
        margin="normal"
        disabled={!editing}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
        disabled={!editing}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        {editing ? (
          <Button variant="contained" color="primary" onClick={handleSave} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        ) : (
          <Button variant="contained" color="secondary" disabled  startIcon={<IconEdit />}>
            Edit
          </Button>
        )}
        <Button variant="contained" color="error" disabled startIcon={<IconTrash />}>
          Delete Account
        </Button>
      </Box>
      <SnackBar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Box>
  );
};

export default ProfileClient;
