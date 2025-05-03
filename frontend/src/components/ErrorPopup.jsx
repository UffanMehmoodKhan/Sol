import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const ErrorPopup = ({ message, onClose }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '85px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#22c55e', 
        color: 'white',
        padding: '16px',
        borderRadius: '8px',
        zIndex: 9999,
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
      }}
    >
      <Typography variant="body1">{message}</Typography>
    </Box>
  );
};

export default ErrorPopup;
