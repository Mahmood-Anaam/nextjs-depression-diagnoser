'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button } from '@mui/material';
import { IconAlertCircle } from '@tabler/icons-react';

const Error = ({ error, reset }) => {
  const router = useRouter();

  const handleRetry = () => {
    // router.replace('/');
    // router.refresh();
    reset();
  };


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        padding: 2,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1,
        gap: 2,
      }}
    >
      <IconAlertCircle size={48} color="error" />
      <Typography variant="h6" color="error">
        Error
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {error?.message || 'An unexpected error occurred'}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRetry}
        startIcon={<IconAlertCircle />}
      >
        Try again
      </Button>
    </Box>
  );
};

export default Error;
